import express from "express"
import Upload from "../middlewares/multer.js"
import {
    forgetPassword,
    genrate2FASecret,
    refreshTokenRotation,
    resetPassword,
    signin,
    signout,
    signup,
    verify2FALogin,
    verifyAndEnable2FA,
    verifyOtp
} from "../controllers/auth_controller.js"
import { verifyToken } from "../middlewares/isAuth.js"
import { authLimiter } from "../middlewares/rete_limter.js"


const authRouter = express.Router()


authRouter.post( "/signup", Upload.fields(
    [
        {
            name: "avatar",
            maxCount: 1
        }
    ]
), signup )
authRouter.post( "/login", authLimiter, signin )
authRouter.post( "/logout", verifyToken, signout )
authRouter.post( "/refresh-token", refreshTokenRotation )
authRouter.post( "/forget-passowrd", authLimiter, forgetPassword )
authRouter.post( "/verify-otp", verifyOtp )
authRouter.post( "/reset-password", resetPassword )
authRouter.post( "/2fa-secret-key", verifyToken, genrate2FASecret )
authRouter.post( "/verify-2fa", verifyToken, verifyAndEnable2FA )
authRouter.post( "/verify-2fa-login", verifyToken, verify2FALogin )



export default authRouter