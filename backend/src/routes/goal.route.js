import express from "express"
import { verifyToken } from "../middlewares/isAuth.js"
import {
    addGoal,
    getGoal,
    getGoalById,
    removeGoal,
    updateGoal,
    updateMilestoneGoal,

} from "../controllers/goal.controller.js"

const goalRouter = express.Router()

goalRouter.post( "/goal", verifyToken, addGoal )
goalRouter.get( "/goal", verifyToken, getGoal )
goalRouter.get( "/goal/:id", verifyToken, getGoalById )
goalRouter.patch( "/update-goal/:id", verifyToken, updateGoal )
goalRouter.patch( "/upadet-goal/:goalId/milestone/:milestoneId", verifyToken, updateMilestoneGoal )
goalRouter.delete( "/delete-goal/:id", verifyToken, removeGoal )

export default goalRouter