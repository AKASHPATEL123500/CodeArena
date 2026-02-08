import express from "express"
import Upload from "../middlewares/multer.js"
import { signin, signup } from "../controllers/auth_controller.js"

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

export default authRouter