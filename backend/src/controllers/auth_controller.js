import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRespone } from "../utils/apiResponse.js";
import User from "../models/user_model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

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
    console.log("Starting Cloudinary upload..."); // ← YE ADD KARO
    if(!avatarFilePath){
        console.log("Cloudinary Upload Finished:", avatar); // ← YE ADD KARO
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



