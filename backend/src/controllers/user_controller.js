import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user_model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiRespone } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const profile = asyncHandler(async(req,res)=>{

    const user = req.user

    if(!user){
        throw new ApiError(401,"Unauthorize access")
    }

    const userWithoutSenstiveData = await User.findById(user._id)
    .select("-password -refreshToken")

    return res.status(200).json(
        new ApiRespone(
            200,
            {
                data : userWithoutSenstiveData
            },
            "Fatceh profile successfully"
        )
    )
})


export const updatePassword = asyncHandler(async(req,res)=>{

    const { oldPassword , newPassword } = req.body

    const trimOldPassword = oldPassword.trim()
    const trimNewPassword = newPassword.trim()

    if( !trimOldPassword || !trimNewPassword){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findById(req.user._id).select("+password")

    if(!user){
        throw new ApiError(401, "Unauthorize access")
    }

    const isPasswordCorrect = await user.isPasswordMatched(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(403, "Incorrect password. try again")
    }

    user.password = trimNewPassword
    await user.save(
        {
            validateBeforeSave : false
        }
    )


    return res.status(200).json(
        new ApiRespone(
            200,
            {},
            "Password change successfully"
        )
    )

})


export const updateProfile = asyncHandler(async(req,res)=>{
    
    const { name , username , email } = req.body

    const trimName = name.trim()
    const trimUsername = username.trim()
    const trimEmail = email.trim()

    const existingUser = await User.findOne(
        {
            $or : [{username :trimUsername}, {email : trimEmail} ],
            _id : {
                $ne : req.user._id
            }
        }
    )

    if(existingUser){
        throw new ApiError(403, "Username and email already exist with this name")
    }

    const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set :{
                name:trimName,
                username:trimUsername,
                email:trimEmail
            }
        },
        {
            new : true
        }
    )

    return res.status(200).json(
        new ApiRespone(
            200,
            {
                data : updateUser
            },
            "Profile update successfully"
        )
    )


})


export const updateAvatar = asyncHandler(async(req,res)=>{

    const inComingAvatar = req.file?.path

    if(!inComingAvatar){
        throw new ApiError(400,"avatar is missing")
    }

    const avatar = await uploadOnCloudinary(inComingAvatar)
    
    if(!avatar){
        throw new ApiError(400,"faild to upload. please try again")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                avatar : avatar.url
            }
        },
        {
            new : true
        }
    ).select("-password -refreshToken")

    return res.status(200).json(
        new ApiRespone(
            200,
            {
                data : user
            },
            "Avatar updated successfully"
        )
    )
})