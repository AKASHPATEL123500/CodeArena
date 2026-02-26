import User from "../models/user_model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyToken = asyncHandler( async ( req, res, next ) => {

    const token = req.cookies?.accessToken
        || req.headers.authorization?.replace( "Bearer ", "" )
        || req.headers[ 'accesstoken' ]

    if ( !token ) {
        throw new ApiError( 401, "Invalid Credentials - No token provided" )
    }

    let decodeToken;
    try {
        decodeToken = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET_KEY )
    } catch ( error ) {
        if ( error.name === 'TokenExpiredError' ) {
            throw new ApiError( 401, "Access token expired. Please refresh." )
        }
        throw new ApiError( 401, "Invalid access token" )
    }

    const user = await User.findById( decodeToken?._id )

    if ( !user ) {
        throw new ApiError( 403, "Unauthorized access - user not found" )
    }

    if ( !user.isActive || user.isDeleted ) {
        throw new ApiError( 403, "Account has been deactivated or deleted" )
    }

    if ( user.changedPasswordAfter && user.changedPasswordAfter( decodeToken.iat ) ) {
        throw new ApiError( 401, "Password changed. Please login again" )
    }

    req.user = user
    next()
} )