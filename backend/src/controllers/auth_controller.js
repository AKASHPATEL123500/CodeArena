import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRespone } from "../utils/apiResponse.js";
import User from "../models/user_model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import { genrateOtp } from "../utils/otp.js";
import QRCode from "qrcode"
import speakeasy from "speakeasy"


const signup = asyncHandler( async ( req, res ) => {

    const { name, username, email, password, role } = req.body

    const trimName = name?.trim()
    const trimUserName = username?.trim()
    const trimEmail = email?.trim()

    if ( trimName.length < 2 || trimName > 50 ) {
        throw new ApiError( 400, "Name must be between 2-50 characters" )
    }

    if ( trimUserName.length < 5 || trimUserName > 20 ) {
        throw new ApiError( 400, "userame must be between 5-20 characters" )
    }

    if ( password.length < 8 ) {
        throw new ApiError( 400, "password must be at least 8 char" )
    }


    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

    if ( !passwordRegex.test( password ) ) {
        throw new ApiError( 400, "Password must contain uppercase, lowercase, number and special character" )
    }


    const avatarFilePath = req.files?.avatar?.[ 0 ]?.path

    if ( !avatarFilePath ) {
        throw new ApiError( 400, "Avatar is missing" )
    }


    if ( !trimName || !trimUserName || !trimEmail || !password ) {
        throw new ApiError( 400, "All fileds are required" )
    }

    const avatar = await uploadOnCloudinary( avatarFilePath )
    if ( !avatar ) {
        throw new ApiError( 400, "Failed to upload image. Please try again" )
    }


    const existingUser = await User.findOne(
        {
            $or: [
                { username: username },
                { email: email }
            ]
        }
    )

    if ( existingUser ) {
        if ( existingUser.email === email ) {
            throw new ApiError( 409, "email already exist" )
        }
        if ( existingUser.username === username ) {
            throw new ApiError( 409, "username already exist" )
        }
    }

    const avatarUrl = avatar.url

    const allowedRole = [ "student", "startup", "mentor" ]

    if ( role && !allowedRole.includes( role ) ) {
        throw new ApiError( 400, "Invalid role. Allowed: student, startup, mentor" )
    }

    const user = await User.create(
        {
            name: trimName,
            username: trimUserName,
            email: trimEmail,
            password: password,
            role: role || "student",
            avatar: avatarUrl
        }
    )

    const freshUserData = await User.findById( user._id ).select( "-password -refreshtoken" )
    return res.status( 201 ).json(
        new ApiRespone( 201, freshUserData, "Signup successfully" )
    )
} )


const signin = asyncHandler( async ( req, res ) => {

    // 1. Get data from request body
    const { email, password } = req.body

    // 2. Validate inputs
    const trimmedEmail = email?.trim()
    const trimmedPassword = password?.trim()

    if ( !trimmedEmail || !trimmedPassword ) {
        throw new ApiError( 400, "Email and password are required" )
    }

    // 3. Find user in database (with password field)
    const existingUser = await User.findOne( {
        email: trimmedEmail.toLowerCase()
    } ).select( '+password' )

    // 4. User not found - timing attack prevention
    const dummyHash = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYzFKqle"
    if ( !existingUser ) {
        await bcrypt.compare( trimmedPassword, dummyHash )
        throw new ApiError( 401, "Invalid credentials" )
    }

    // 5. Check account status
    if ( !existingUser.isActive ) {
        throw new ApiError( 403, "Account has been deactivated. Contact support" )
    }

    // 6. Check account lock
    if ( existingUser.lockUntil && existingUser.lockUntil > Date.now() ) {
        const remainingMinutes = Math.ceil(
            ( existingUser.lockUntil - Date.now() ) / ( 60 * 1000 )
        )
        throw new ApiError(
            403,
            `Account locked. Try again after ${ remainingMinutes } minutes`
        )
    }

    // 7. Verify password
    const isPasswordCorrect = await existingUser.isPasswordMatched( trimmedPassword )

    if ( !isPasswordCorrect ) {
        await existingUser.incrementLoginAttempts()
        throw new ApiError( 401, "Invalid credentials" )
    }

    // 8. Password correct - reset login attempts
    await existingUser.resetLoginAttempts()

    if ( existingUser.twoFactorEnabled ) {
        return res
            .status( 200 )
            .json(
                new ApiRespone(
                    200,
                    {
                        twoFactorRequired: true,
                        userId: existingUser._id
                    },
                    "Enter 2FA Code"
                )
            )
    }
    // 9. Generate tokens
    const accessToken = existingUser.generateAccessToken()
    const refreshToken = existingUser.generateRefreshToken()

    // 10. Save refresh token and update lastLogin (single DB call)
    existingUser.refreshToken = refreshToken
    existingUser.lastLogin = Date.now()
    await existingUser.save( { validateBeforeSave: false } )


    // 11. Get user data without sensitive fields
    const userWithoutPassword = await User.findById( existingUser._id )
        .select( '-password -refreshToken' )

    // 12. Cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    }

    // 13. Send response
    return res
        .status( 200 )
        .cookie( "accessToken", accessToken, cookieOptions )
        .cookie( "refreshToken", refreshToken, cookieOptions )
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
} )


const signout = asyncHandler( async ( req, res ) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status( 200 )
        .clearCookie( "accessToken", cookieOptions )
        .clearCookie( "refreshToken", cookieOptions )
        .json(
            new ApiRespone(
                200,
                {},
                "SignOut Successfully"
            )
        )

} )


const refreshTokenRotation = asyncHandler( async ( req, res ) => {

    // 1. Get token
    const inCommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if ( !inCommingRefreshToken ) {
        throw new ApiError( 401, "Refresh token is required" )
    }

    // 2. Verify token

    let decodeToken
    try {
        decodeToken = jwt.verify(
            inCommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        )
    } catch ( error ) {
        throw new ApiError( 401, "Invalid or expired refresh token" )
    }

    // 3. Find user
    const user = await User.findById( decodeToken?._id )

    if ( !user ) {
        console.log( "❌ User not found" )
        throw new ApiError( 401, "User not found" )
    }


    if ( inCommingRefreshToken !== user.refreshToken ) {
        throw new ApiError( 401, "Refresh token is invalid or expired" )
    }

    // 5. Generate new tokens
    const newAccessToken = user.generateAccessToken()
    const newRefreshToken = user.generateRefreshToken()

    // 6. Save
    user.refreshToken = newRefreshToken
    await user.save( { validateBeforeSave: false } )

    // 7. Response
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // ← FIXED!
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }


    return res
        .status( 200 )
        .cookie( "accessToken", newAccessToken, cookieOptions )
        .cookie( "refreshToken", newRefreshToken, cookieOptions )
        .json(
            new ApiRespone(
                200,
                { accessToken: newAccessToken },
                "Token refreshed successfully"
            )
        )
} )


const forgetPassword = asyncHandler( async ( req, res ) => {

    const { email } = req.body

    if ( !email ) {
        throw new ApiError(
            400,
            "Email is required"
        )
    }

    const user = await User.findOne( { email } )

    if ( !user ) {
        throw new ApiError(
            404,
            "User not found"
        )
    }

    const otp = genrateOtp()
    user.resetOtp = otp
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000

    await user.save( { validateBeforeSave: false } )

    await sendMail(
        {
            to: email,
            subject: "Password reset otp",
            text: `Your otp is${ otp }`
        }
    )

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                {},
                "OTP send to your email. please check"
            )
        )
} )


const verifyOtp = asyncHandler( async ( req, res ) => {
    const { email, otp } = req.body

    if ( !email || !otp ) throw new ApiError( 400, "All fields are required" )

    const user = await User.findOne( { email } )

    if ( !user || user.resetOtp !== otp ) throw new ApiError( 400, "Invaild OTP" )

    if ( user.resetOtpExpire < Date.now() ) throw new ApiError( 400, "OTP is expired" )

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                {},
                "Verify OTP successfully"
            )
        )
} )


const resetPassword = asyncHandler( async ( req, res ) => {

    const { email, otp, newPassword, confirmPassword } = req.body

    if ( !email || !otp || !newPassword || !confirmPassword ) {
        throw new ApiError( 400, "All fileds are required" )
    }

    if ( newPassword !== confirmPassword ) {
        throw new ApiError( 400, "Password do not match" )
    }

    const user = await User.findOne( { email } )

    if ( !user ) throw new ApiError( 404, "User not found" )

    if ( !user || user.resetOtp !== otp ) {
        throw new ApiError( 400, "Invaild OTP" )
    }

    if ( user.resetOtpExpire < Date.now() ) {
        throw new ApiError( 400, "OTP expired" )
    }

    user.password = newPassword
    user.resetOtp = undefined
    user.resetOtpExpire = undefined
    user.isVerified = true

    user.save( { validateBeforeSave: false } )

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                {},
                "Password reset successfully"
            )
        )
} )


const genrate2FASecret = asyncHandler( async ( req, res ) => {

    const user = req.user

    const secret = speakeasy.generateSecret(
        {
            name: `CodeArena(${ user.email })`
        }
    )

    user.twoFactorSecret = secret.base32
    await user.save()

    const qr = await QRCode.toDataURL( secret.otpauth_url )

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                {
                    QrCode: qr
                },
                "Sacn QR with Authenticatior"
            )
        )
} )

const verifyAndEnable2FA = asyncHandler( async ( req, res ) => {

    const { token } = req.body

    const user = req.user

    const verify = speakeasy.totp.verify(
        {
            secret: user.twoFactorSecret,
            encoding: "base32",
            token
        }
    )

    if ( !verify ) throw new ApiError( 400, "Invaild code" )

    user.twoFactorEnabled = true
    await user.save()

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                {},
                "2FA Enable successfully"
            )
        )
} )


const verify2FALogin = asyncHandler( async ( req, res ) => {

    const { userId, token } = req.body

    if ( !userId || !token )
        throw new ApiError( 400, "Missing data" )

    const user = await User.findById( userId )

    if ( !user || !user.twoFactorEnabled )
        throw new ApiError( 400, "Invalid request" )

    const ok = speakeasy.totp.verify( {
        secret: user.twoFactorSecret,
        encoding: "base32",
        token
    } )

    if ( !ok ) throw new ApiError( 400, "Wrong 2FA Code" )

    // ✅ ISSUE TOKENS HERE
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.lastLogin = Date.now()
    await user.save( { validateBeforeSave: false } )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
        .cookie( "accessToken", accessToken, cookieOptions )
        .cookie( "refreshToken", refreshToken, cookieOptions )
        .json(
            new ApiRespone( 200, {}, "2FA Login success" )
        )
} )



export {
    signup,
    signin,
    signout,
    refreshTokenRotation,
    forgetPassword,
    verifyOtp,
    resetPassword,
    genrate2FASecret,
    verifyAndEnable2FA,
    verify2FALogin
}
