import express from "express"
import Upload from "../middlewares/multer.js"
import { refreshTokenRotation, signin, signout, signup } from "../controllers/auth_controller.js"
import { verifyToken } from "../middlewares/isAuth.js"

const authRouter = express.Router()

authRouter.post("/signup",Upload.fields(
    [
        {
            name : "avatar",
            maxCount : 1
        }
    ]
),signup)
authRouter.post("/login",signin)
authRouter.post("/logout",verifyToken,signout)
authRouter.post("/refresh-token",refreshTokenRotation)

export default authRouter