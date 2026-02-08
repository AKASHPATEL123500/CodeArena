import express from "express"
import Upload from "../middlewares/multer.js"
import { signup } from "../controllers/auth_controller.js"

const authRouter = express.Router()

authRouter.post("/signup",Upload.fields(
    [
        {
            name : "avatar",
            maxCount : 1
        }
    ]
),signup)

export default authRouter