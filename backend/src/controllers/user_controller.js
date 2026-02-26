import uploadOnCloudinary from "../config/cloudinary.js"
import Skill from "../models/skill_model.js"
import User from "../models/user_model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiRespone } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { DeleteHistory } from "../models/delete.history.js"
import geoip from "geoip-lite"

// ✅ Removed unused import { time } from "speakeasy"

const profile = asyncHandler( async ( req, res ) => {

    const user = req.user

    if ( !user ) throw new ApiError( 401, "Unauthorized access" )

    const userWithoutSensitiveData = await User.findById( user._id )
        .select( "-password -refreshToken" )

    return res.status( 200 ).json(
        new ApiRespone( 200, { data: userWithoutSensitiveData }, "Profile fetched successfully" )
    )
} )


const updatePassword = asyncHandler( async ( req, res ) => {

    const { oldPassword, newPassword } = req.body

    const trimOldPassword = oldPassword?.trim()
    const trimNewPassword = newPassword?.trim()

    if ( !trimOldPassword || !trimNewPassword ) {
        throw new ApiError( 400, "All fields are required" )
    }

    const user = await User.findById( req.user._id ).select( "+password" )

    if ( !user ) throw new ApiError( 401, "Unauthorized access" )

    const isPasswordCorrect = await user.isPasswordMatched( trimOldPassword )

    if ( !isPasswordCorrect ) throw new ApiError( 403, "Incorrect password. Try again" )

    user.password = trimNewPassword
    await user.save( { validateBeforeSave: false } )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "Password changed successfully" )
    )
} )


const updateProfile = asyncHandler( async ( req, res ) => {

    const { name, username, email } = req.body

    // ✅ Optional chaining + validation
    const trimName = name?.trim()
    const trimUsername = username?.trim()
    const trimEmail = email?.trim()

    if ( !trimName || !trimUsername || !trimEmail ) {
        throw new ApiError( 400, "All fields are required" )
    }

    const existingUser = await User.findOne( {
        $or: [ { username: trimUsername }, { email: trimEmail } ],
        _id: { $ne: req.user._id }
    } )

    if ( existingUser ) {
        throw new ApiError( 403, "Username or email already exists" )
    }

    const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                name: trimName,
                username: trimUsername,
                email: trimEmail
            }
        },
        { new: true }
    ).select( "-password -refreshToken" )

    return res.status( 200 ).json(
        new ApiRespone( 200, { data: updateUser }, "Profile updated successfully" )
    )
} )


const updateAvatar = asyncHandler( async ( req, res ) => {

    const inComingAvatar = req.file?.path

    if ( !inComingAvatar ) throw new ApiError( 400, "Avatar is missing" )

    const avatar = await uploadOnCloudinary( inComingAvatar )

    if ( !avatar ) throw new ApiError( 400, "Failed to upload. Please try again" )

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { avatar: avatar.url } },
        { new: true }
    ).select( "-password -refreshToken" )

    return res.status( 200 ).json(
        new ApiRespone( 200, { data: user }, "Avatar updated successfully" )
    )
} )


const addUserSkill = asyncHandler( async ( req, res ) => {

    const { skillIds, proficiency } = req.body
    const user = req.user

    if ( !skillIds || !Array.isArray( skillIds ) || skillIds.length === 0 ) {
        throw new ApiError( 400, "skillIds array is required" )
    }

    if ( !proficiency ) throw new ApiError( 400, "Proficiency is required" )

    const allowedProficiency = [ "beginner", "intermediate", "advanced" ]

    if ( !allowedProficiency.includes( proficiency ) ) {
        throw new ApiError( 400, "Invalid proficiency level" )
    }

    const skills = await Skill.find( {
        _id: { $in: skillIds },
        isActive: true
    } )

    if ( skills.length !== skillIds.length ) {
        throw new ApiError( 404, "Some skills not found" )
    }

    const existingSkillIds = user.skills.map( s => s.skill.toString() )
    const duplicates = skillIds.filter( id => existingSkillIds.includes( id ) )

    if ( duplicates.length > 0 ) throw new ApiError( 409, "Some skills already added" )

    for ( const skillId of skillIds ) {
        user.skills.push( { skill: skillId, proficiency } )

        const skillDoc = await Skill.findById( skillId )
        if ( skillDoc ) await skillDoc.incrementUserCount()
    }

    await user.save( { validateBeforeSave: false } )

    const updatedUser = await User.findById( user._id )
        .select( '-password -refreshToken' )
        .populate( 'skills.skill', 'name slug icon category' )

    return res.status( 201 ).json(
        new ApiRespone( 201, {
            skills: updatedUser.skills,
            count: updatedUser.skills.length
        }, "Skills added successfully" )
    )
} )


const getUserSkill = asyncHandler( async ( req, res ) => {

    const user = req.user

    await user.populate( 'skills.skill', 'name slug icon category difficulty totalUsers' )

    user.skills.sort( ( a, b ) => b.addedAt - a.addedAt )

    return res.status( 200 ).json(
        new ApiRespone( 200, {
            skills: user.skills,
            count: user.skills.length
        }, "Skills fetched successfully" )
    )
} )


const updateUserSkill = asyncHandler( async ( req, res ) => {

    const { skillId } = req.params
    const { proficiency } = req.body
    const user = req.user

    if ( !skillId || !proficiency ) throw new ApiError( 400, "All fields are required" )

    const allowedProficiency = [ "beginner", "intermediate", "advanced" ]

    if ( !allowedProficiency.includes( proficiency ) ) {
        throw new ApiError( 400, "Invalid proficiency level" )
    }

    const userSkill = user.skills.find( s => s.skill.toString() === skillId )

    if ( !userSkill ) throw new ApiError( 404, "Skill not found in your profile" )

    userSkill.proficiency = proficiency

    await user.save( { validateBeforeSave: false } )

    await user.populate( 'skills.skill', 'name slug icon' )

    return res.status( 200 ).json(
        new ApiRespone( 200, { skill: userSkill }, "Proficiency updated successfully" )
    )
} )


const removeUserSkill = asyncHandler( async ( req, res ) => {

    const { skillId } = req.params
    const user = req.user

    if ( !skillId ) throw new ApiError( 400, "Skill ID is required" )

    const skillExists = user.skills.some( s => s.skill.toString() === skillId )

    if ( !skillExists ) throw new ApiError( 404, "Skill not found in your profile" )

    user.skills = user.skills.filter( s => s.skill.toString() !== skillId )

    const skill = await Skill.findById( skillId )
    if ( skill ) await skill.decrementUserCount()

    await user.save( { validateBeforeSave: false } )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "Skill removed successfully" )
    )
} )


const deteteUserAccount = asyncHandler( async ( req, res ) => {

    const { reason, additionalInfo } = req.body
    const user = req.user
    const agent = req.headers[ "user-agent" ]

    // ✅ IP properly extract karo
    let ip = req.headers[ "x-forwarded-for" ]?.split( "," )[ 0 ]?.trim()
        || req.socket.remoteAddress
        || "Unknown"

    // ✅ IPv6 localhost ko IPv4 mein convert karo
    if ( ip === "::1" || ip === "::ffff:127.0.0.1" ) {
        ip = "127.0.0.1"
    }

    // ✅ IPv6 mapped IPv4 handle karo (::ffff:192.168.1.1 → 192.168.1.1)
    if ( ip.startsWith( "::ffff:" ) ) {
        ip = ip.replace( "::ffff:", "" )
    }

    // ✅ GeoIP lookup with localhost fallback
    let address = { city: "Unknown", country: "Unknown", region: "Unknown", timezone: "Unknown" }

    if ( ip !== "127.0.0.1" ) {
        const geo = geoip.lookup( ip )
        if ( geo ) {
            address = {
                country: geo.country,
                region: geo.region,
                city: geo.city,
                timezone: geo.timezone
            }
        }
    }

    await DeleteHistory.create( {
        user: user._id,
        name: user.name,
        email: user.email,
        ip: ip,
        userAgent: agent,
        location: ip === "127.0.0.1"
            ? "Localhost (Development)"
            : `${ address.city }, ${ address.region }, ${ address.country }`,
        reason: reason || "user_request",
        additionalInfo: additionalInfo || "",
        lastSeen: new Date(),
        firstSeen: user.createdAt,
        deletedBy: user._id,
        isDeleted: true,
        deletionMethod: "self_service"
    } )

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                isActive: false,
                isDeleted: true,
                deletedAt: new Date(),
                deletedReason: reason || "user_request"
            },
            $unset: { refreshToken: 1 },
            $push: {
                userIpAdresses: {
                    ip: ip,
                    firstSeen: new Date(),
                    lastSeen: new Date(),
                    userAgent: agent
                }
            }
        },
        { new: true }
    )

    if ( !updatedUser ) throw new ApiError( 404, "User not found" )

    const options = { httpOnly: true, secure: true }

    return res
        .status( 200 )
        .clearCookie( "refreshToken", options )
        .clearCookie( "accessToken", options )
        .json( new ApiRespone( 200, {}, "Account deleted successfully" ) )
} )



export {
    profile,
    updateProfile,
    updatePassword,
    updateAvatar,
    addUserSkill,
    getUserSkill,
    updateUserSkill,
    removeUserSkill,
    deteteUserAccount,
}