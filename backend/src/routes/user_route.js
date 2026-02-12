import express from "express"
import Upload from "../middlewares/multer.js"
import { verifyToken } from "../middlewares/isAuth.js"
import { 
    addUserSkill,
    getUserSkill,
    profile, 
    removeUserSkill, 
    updateAvatar, 
    updatePassword, 
    updateProfile, 
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


export default userRouter