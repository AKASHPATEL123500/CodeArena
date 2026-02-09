import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRespone } from "../utils/apiResponse.js";
import User from "../models/user_model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signup = asyncHandler(async(req,res)=>{

    const { name, username, email, password, role } = req.body

    const trimName = name?.trim()
    const trimUserName = username?.trim()
    const trimEmail = email?.trim()

    if(trimName.length < 2 || trimName > 50){
        throw new ApiError(400,"Name must be between 2-50 characters")
    }

    if(trimUserName.length < 5 || trimUserName > 20){
        throw new ApiError(400,"userame must be between 5-20 characters")
    }

    if(password.length < 8){
        throw new ApiError(400,"password must be at least 8 char")
    }


    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

    if(!passwordRegex.test(password)) {
        throw new ApiError(400, "Password must contain uppercase, lowercase, number and special character")
    }


    const avatarFilePath = req.files?.avatar?.[0]?.path

    if(!avatarFilePath){
        throw new ApiError(400,"Avatar is missing")
    }


    if( !trimName || !trimUserName || !trimEmail || !password){
        throw new ApiError(400,"All fileds are required")
    }

    const avatar = await uploadOnCloudinary(avatarFilePath)
    if(!avatar){
        throw new ApiError(400,"Failed to upload image. Please try again")
    }


    const existingUser = await User.findOne(
        {
            $or:[
                {username : username},
                {email : email}
            ]
        }
    )

    if(existingUser){
        if(existingUser.email === email){
            throw new ApiError(409,"email already exist")
        }
        if(existingUser.username === username){
            throw new ApiError(409,"username already exist")
        }
    }

    const avatarUrl = avatar.url

    const allowedRole = ["student", "startup", "mentor"]

    if(role && !allowedRole.includes(role)){
        throw new ApiError(400,"Invalid role. Allowed: student, startup, mentor")
    }

    const user = await User.create(
        {
            name : trimName,
            username : trimUserName,
            email : trimEmail,
            password : password,
            role : role || "student",
            avatar : avatarUrl
        }
    )

    const freshUserData = await User.findById(user._id).select("-password -refreshtoken")
    return res.status(201).json(
        new ApiRespone(201,freshUserData,"Signup successfully")
    )
})


export const signin = asyncHandler(async(req, res) => {

    // 1. Get data from request body
    const { email, password } = req.body
    
    // 2. Validate inputs
    const trimmedEmail = email?.trim()
    const trimmedPassword = password?.trim()
    
    if(!trimmedEmail || !trimmedPassword) {
        throw new ApiError(400, "Email and password are required")
    }

    // 3. Find user in database (with password field)
    const existingUser = await User.findOne({
        email: trimmedEmail.toLowerCase()
    }).select('+password')
    
    // 4. User not found - timing attack prevention
    const dummyHash = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYzFKqle"
    if(!existingUser) {
        await bcrypt.compare(trimmedPassword, dummyHash)
        throw new ApiError(401, "Invalid credentials")
    }

    // 5. Check account status
    if(!existingUser.isActive) {
        throw new ApiError(403, "Account has been deactivated. Contact support")
    }

    // 6. Check account lock
    if(existingUser.lockUntil && existingUser.lockUntil > Date.now()) {
        const remainingMinutes = Math.ceil(
            (existingUser.lockUntil - Date.now()) / (60 * 1000)
        )
        throw new ApiError(
            403,
            `Account locked. Try again after ${remainingMinutes} minutes`
        )
    }

    // 7. Verify password
    const isPasswordCorrect = await existingUser.isPasswordMatched(trimmedPassword)
    
    if(!isPasswordCorrect) {
        await existingUser.incrementLoginAttempts()
        throw new ApiError(401, "Invalid credentials")
    }

    // 8. Password correct - reset login attempts
    await existingUser.resetLoginAttempts()

    // 9. Generate tokens
    const accessToken = existingUser.generateAccessToken()
    const refreshToken = existingUser.generateRefreshToken()

    // 10. Save refresh token and update lastLogin (single DB call)
    existingUser.refreshToken = refreshToken
    existingUser.lastLogin = Date.now()
    await existingUser.save({validateBeforeSave : false})


    // 11. Get user data without sensitive fields
    const userWithoutPassword = await User.findById(existingUser._id)
        .select('-password -refreshToken')

    // 12. Cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    }

    // 13. Send response
    return res
        .status(200)
        .cookie("accessToken",accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiRespone(
                200,
                {
                    user: userWithoutPassword,
                    accessToken: accessToken
                },
                "Sign in successful"
            )
        )
})


export const signout = asyncHandler(async(req,res)=>{
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken : 1
            }
        }
    )

    const cookieOptions = {
        httpOnly: true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(
        new ApiRespone(
            200,
            {},
            "SignOut Successfully"
        )
    )

})


export const refreshTokenRotation = asyncHandler(async(req, res) => {
    
    console.log("🔄 Refresh Token Rotation Started")
    
    // 1. Get token
    const inCommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    console.log("📥 Incoming token:", inCommingRefreshToken ? "Present" : "Missing")
    console.log("🍪 Cookies:", req.cookies)
    console.log("📦 Body:", req.body)

    if(!inCommingRefreshToken){
        throw new ApiError(401, "Refresh token is required")
    }

    // 2. Verify token
    console.log("🔐 Verifying token...")
    
    let decodeToken
    try {
        decodeToken = jwt.verify(
            inCommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        )
        console.log("✅ Token verified successfully")
        console.log("👤 User ID from token:", decodeToken._id)
    } catch (error) {
        console.log("❌ Token verification failed:", error.message)
        throw new ApiError(401, "Invalid or expired refresh token")
    }

    // 3. Find user
    console.log("🔍 Finding user in database...")
    const user = await User.findById(decodeToken?._id)

    if(!user){
        console.log("❌ User not found")
        throw new ApiError(401, "User not found")
    }
    console.log("✅ User found:", user.email)

    // 4. Compare tokens
    console.log("🔑 Comparing tokens...")
    console.log("Incoming token:", inCommingRefreshToken)
    console.log("DB token:", user.refreshToken)
    console.log("Match?", inCommingRefreshToken === user.refreshToken)

    if(inCommingRefreshToken !== user.refreshToken){
        console.log("❌ Token mismatch!")
        throw new ApiError(401, "Refresh token is invalid or expired")
    }
    console.log("✅ Tokens match!")

    // 5. Generate new tokens
    console.log("🔄 Generating new tokens...")
    const newAccessToken = user.generateAccessToken()
    const newRefreshToken = user.generateRefreshToken()

    // 6. Save
    console.log("💾 Saving new refresh token to DB...")
    user.refreshToken = newRefreshToken
    await user.save({ validateBeforeSave: false })
    console.log("✅ Saved successfully")

    // 7. Response
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // ← FIXED!
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    console.log("🍪 Setting cookies with options:", cookieOptions)

    return res
        .status(200)
        .cookie("accessToken", newAccessToken, cookieOptions)
        .cookie("refreshToken", newRefreshToken, cookieOptions)
        .json(
            new ApiRespone(
                200,
                { accessToken: newAccessToken },
                "Token refreshed successfully"
            )
        )
})


// ### **STEP 3: Test Karke Console Dekho**

// **Postman/Thunder Client:**
// ```
// POST http://localhost:5000/api/auth/refresh-token

// Body (raw JSON):
// {
//     "refreshToken": "paste_your_token_here"
// }

