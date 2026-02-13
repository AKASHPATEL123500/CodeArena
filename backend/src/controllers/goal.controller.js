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

    const { goalId } = req.params

    const { title, description, status, targetSkills, deadline, milestones, isPublic } = req.body

    if ( !goalId ) throw new ApiError( 400, "Goald id must be sent" )

    const goal = await Goal.findById( goalId ).populate( "targetSkills", "name slug icon category difficulty" )

    if ( !goal ) throw new ApiError( 404, "Goal not found" )

    if ( title ) goal.title = title?.trim()
    if ( description !== undefined ) goal.description = description?.trim()
    if ( status ) goal.status = status
    if ( isPublic !== undefined ) goal.isPublic = isPublic
    if ( deadline ) {
        const deadLineDate = new Date( deadline )
        if ( deadLineDate < Date.now() ) {
            throw new ApiError( 400, "Deadline date must be feauters date" )
        }
        goal.deadline = deadLineDate
    }

    await goal.save()

    await goal.populate( "targetSkills", "name slug icon" )

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                { goal },
                "Update goals successfully"
            )
        )


} )


const removeGoal = asyncHandler( async ( req, res ) => {

    const { goalId } = req.params

    if ( !goalId ) throw new ApiError( 400, "Filed are required" )

    const goal = await Goal.findById( goalId )

    if ( !goal ) throw new ApiError( 404, "Invaild Goal Id" )

    if ( goal.owner.toString() !== req.user._id.toString() ) throw new ApiError( 403, "Access denied" )

    goal.status = "abandoned"
    await goal.save()

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                {},
                "Remove Goal successfully"
            )
        )
} )


const getGoalById = asyncHandler( async ( req, res ) => {
    const { goalId } = req.params
    if ( !goalId ) throw new ApiError( 400, "Filed are required" )

    const goal = await Goal.findById( goalId ).populate( "targetSkills", "name slug icon category difficulty" )

    if ( !goal ) throw new ApiError( 404, "Invaild Goal Id" )

    if ( goal.owner.toString() !== req.user._id.toString() )
        throw new ApiError( 403, "You don't have permission to view this goal" )

    return res
        .status( 200 )
        .json(
            new ApiError(
                200,
                { goal },
                "Successfully get goal by id"
            )
        )
} )


const updateMilestoneGoal = asyncHandler( async ( req, res ) => {

    const { goalId, milestoneId } = req.params
    const { completed } = req.body

    if ( !completed ) throw new ApiError( 400, "All feialds are required" )

    const goal = await Goal.findById( goalId )

    if ( !goal ) throw new ApiError( 404, "Goal not found" )

    if ( goal.owner.toString() !== req.user._id.toString() )
        throw new ApiError( 403, "Access deined" )

    const milestone = await goal.milestones.id( milestoneId )

    if ( !milestone ) throw new ApiError( 404, "Milestone id not match" )

    if ( completed === true ) {
        milestone.completed = true
        milestone.completedAt = Date.now()
    } else if ( completed === false ) {
        milestone.completed = false
        milestone.completedAt = null
    }

    await goal.updatedProgress()

    return res
        .status( 200 )
        .json(
            new ApiRespone(
                200,
                { goal },
                "update Milestone Goal successfully"
            )
        )
} )


export {
    addGoal,
    getGoal,
    updateGoal,
    removeGoal,
    getGoalById,
    updateMilestoneGoal
}