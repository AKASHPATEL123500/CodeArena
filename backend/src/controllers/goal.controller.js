import { Goal } from "../models/goal_model.js"
import Skill from "../models/skill_model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiRespone } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const addGoal = asyncHandler( async ( req, res ) => {

    const {
        title,
        description,
        targetSkills,
        deadline,
        milestones,
        isPublic
    } = req.body

    if ( !title ) throw new ApiError( 400, "title is required" )

    if ( !deadline ) throw new ApiError( 400, "Deadline is required" )

    const deadLineDate = new Date( deadline )

    if ( deadLineDate <= Date.now() ) throw new ApiError( 400, "deadline must be a feauters date" )

    if ( targetSkills && targetSkills.length > 0 ) {
        const skills = await Skill.find(
            {
                _id: {
                    $in: targetSkills
                },
                isActive: true
            }
        )

        if ( skills.length !== targetSkills.length ) {
            throw new ApiError(
                400,
                "Some skill not found"
            )
        }
    }

    const createGoal = await Goal.create(
        {
            owner: req.user._id,
            title: title?.trim(),
            description: description?.trim(),
            targetSkills: targetSkills || [],
            deadline: deadLineDate,
            milestones: milestones || [],
            isPublic: isPublic !== undefined ? isPublic : true
        }
    )

    return res
        .status( 201 )
        .json(
            new ApiRespone(
                201,
                {
                    data: createGoal
                },
                "User goal added successfully"
            )
        )
} )


const getGoal = asyncHandler( async ( req, res ) => {
    // 1. Build filter
    const filter = { owner: req.user._id }

    // 2. Add status filter (if provided)
    const { status } = req.query
    if ( status ) {
        filter.status = status
    }

    // 3. Query goals
    const goals = await Goal.find( filter )
        .populate( 'targetSkills', 'name slug icon category' )
        .sort( { deadline: 1 } )  // Nearest deadline first

    // 4. Response
    return res.status( 200 ).json(
        new ApiRespone(
            200,
            {
                goals,
                count: goals.length
            },
            "Goals fetched successfully"
        )
    )
} )


const updateGoal = asyncHandler( async ( req, res ) => {

} )


const removeGoal = asyncHandler( async ( req, res ) => {

} )


const getGoalById = asyncHandler( async ( req, res ) => {

} )


const updateMilestoneGoal = asyncHandler( async ( req, res ) => {

} )


export {
    addGoal,
    getGoal,
    updateGoal,
    removeGoal,
    getGoalById,
    updateMilestoneGoal
}