import express from "express"
import Upload from "../middlewares/multer.js"
import { verifyToken } from "../middlewares/isAuth.js"
import { 
    addUserGoal,
    addUserSkill, 
    getUserGoal, 
    getUserGoalById, 
    getUserSkill, 
    profile, 
    removeUserGoal, 
    removeUserSkill, 
    updateAvatar, 
    updateMilestoneUserGoal, 
    updatePassword, 
    updateProfile, 
    updateUserGoal, 
    updateUserSkill 
} from "../controllers/user_controller.js"
const userRouter = express.Router()

userRouter.get("/profile",verifyToken,profile)
userRouter.patch("/update-profile",verifyToken,updateProfile)
userRouter.post("/change-password",verifyToken,updatePassword)
userRouter.post("/update-avatar",verifyToken,Upload.single("avatar"),updateAvatar)
userRouter.post("/skills",verifyToken,addUserSkill)
userRouter.get("/skills",verifyToken,getUserSkill)
userRouter.patch("/skills/:skillId",verifyToken,updateUserSkill)
userRouter.delete("/skills/:skillId",verifyToken,removeUserSkill)
userRouter.post("/goal",verifyToken,addUserGoal)
userRouter.get("/goal",verifyToken,getUserGoal)
userRouter.patch("/goal-update/:id",verifyToken,updateUserGoal)
userRouter.delete("/goal/:id",verifyToken,removeUserGoal)
userRouter.get("/goal/:id",verifyToken,getUserGoalById)
userRouter.get("/goal/:id",verifyToken,updateMilestoneUserGoal)


export default userRouter