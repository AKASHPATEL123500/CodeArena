import uploadOnCloudinary from "../config/cloudinary.js"
import Skill from "../models/skill_model.js"
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


// ========== ADD USER SKILL ==========
export const addUserSkill = asyncHandler(async(req, res) => {

    // 1. Extract data
    const { skillIds, proficiency } = req.body  // Array!
    const user = req.user

    // 2. Validate
    if (!skillIds || !Array.isArray(skillIds) || skillIds.length === 0) {
        throw new ApiError(400, "skillIds array is required")
    }

    if (!proficiency) {
        throw new ApiError(400, "Proficiency is required")
    }

    // 3. Check proficiency valid
    const allowedProficiency = ["beginner", "intermediate", "advanced"]  
    
    if (!allowedProficiency.includes(proficiency)) {  
        throw new ApiError(400, "Invalid proficiency level")
    }

    // 4. Check skills exist
    const skills = await Skill.find({ 
        _id: { $in: skillIds },
        isActive: true
    })

    if (skills.length !== skillIds.length) {
        throw new ApiError(404, "Some skills not found")
    }

    // 5. Check duplicates
    const existingSkillIds = user.skills.map(s => s.skill.toString())
    const duplicates = skillIds.filter(id => existingSkillIds.includes(id))

    if (duplicates.length > 0) {
        throw new ApiError(409, "Some skills already added")
    }

    // 6. Add skills
    for (const skillId of skillIds) {
        user.skills.push({
            skill: skillId,
            proficiency: proficiency
        })

        // Increment totalUsers
        const skillDoc = await Skill.findById(skillId)
        if (skillDoc) {
            await skillDoc.incrementUserCount()
        }
    }

    // 7. Save
    await user.save({ validateBeforeSave: false })

    // 8. Get fresh data without password
    const updatedUser = await User.findById(user._id)
        .select('-password -refreshToken')
        .populate('skills.skill', 'name slug icon category')

    // 9. Response
    return res.status(201).json(
        new ApiRespone(
            201,
            {
                skills: updatedUser.skills,
                count: updatedUser.skills.length
            },
            "Skills added successfully"
        )
    )
})


export const getUserSkill = asyncHandler(async(req, res) => {

    const user = req.user

    // Populate
    await user.populate('skills.skill', 'name slug icon category difficulty totalUsers')

    // Sort (newest first)
    user.skills.sort((a, b) => b.addedAt - a.addedAt)

    return res.status(200).json(
        new ApiRespone(
            200,
            {
                skills: user.skills,
                count: user.skills.length
            },
            "Skills fetched successfully"
        )
    )
})


export const updateUserSkill = asyncHandler(async(req, res) => {

    const { skillId } = req.params
    const { proficiency } = req.body  // Fixed extraction!
    const user = req.user

    // Validate
    if (!skillId || !proficiency) {
        throw new ApiError(400, "All fields are required")
    }

    const allowedProficiency = ["beginner", "intermediate", "advanced"]  // Fixed typo!

    if (!allowedProficiency.includes(proficiency)) {  // Added NOT!
        throw new ApiError(400, "Invalid proficiency level")
    }

    // Find skill
    const userSkill = user.skills.find(s => s.skill.toString() === skillId)

    if (!userSkill) {
        throw new ApiError(404, "Skill not found in your profile")
    }

    // Update
    userSkill.proficiency = proficiency

    // Save
    await user.save({ validateBeforeSave: false })

    // Populate & return
    await user.populate('skills.skill', 'name slug icon')

    return res.status(200).json(
        new ApiRespone(
            200,
            {
                skill: userSkill
            },
            "Proficiency updated successfully"
        )
    )
})

export const removeUserSkill = asyncHandler(async(req, res) => {

    const { skillId } = req.params
    const user = req.user

    // Validate
    if (!skillId) {
        throw new ApiError(400, "Skill ID is required")
    }

    // Check exists
    const skillExists = user.skills.some(s => s.skill.toString() === skillId)

    if (!skillExists) {
        throw new ApiError(404, "Skill not found in your profile")
    }

    // Remove
    user.skills = user.skills.filter(s => s.skill.toString() !== skillId)

    // Decrement totalUsers
    const skill = await Skill.findById(skillId)  // Fixed typo!
    if (skill) {
        await skill.decrementUserCount()
    }

    // Save
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiRespone(
            200,
            {},
            "Skill removed successfully"
        )
    )
})