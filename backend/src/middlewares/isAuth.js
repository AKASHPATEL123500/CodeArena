import User from "../models/user_model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyToken = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Invaild Credentials")
    }

    const decodeToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    if (!decodeToken) {
        throw new ApiError(403, "Access Token is expire")
    }


    const user = await User.findById(decodeToken?._id)

    if (!user) {
        throw new ApiError(403, "Unauthorize access")
    }

    // 4. Check password changed after token issue (optional)
    if(user.changedPasswordAfter && user.changedPasswordAfter(decodeToken.iat)){
        throw new ApiError(401, "Password changed. Please login again")
    }
    
    req.user = user
    next()

})