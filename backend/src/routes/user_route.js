import express from "express"
import { verifyToken } from "../middlewares/isAuth.js"
import { 
    profile, 
    updateAvatar, 
    updatePassword, 
    updateProfile 
} from "../controllers/user_controller.js"
import Upload from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/profile",verifyToken,profile)
userRouter.patch("/update-profile",verifyToken,updateProfile)
userRouter.post("/change-password",verifyToken,updatePassword)
userRouter.post("/update-avatar",verifyToken,Upload.single("avatar"),updateAvatar)

export default userRouter