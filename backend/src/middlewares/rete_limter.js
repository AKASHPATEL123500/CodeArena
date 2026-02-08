import rateLimt from "express-rate-limit"

const authLimiter = rateLimt(
    {
        windowMs : 15 * 60 * 1000,
        max : 5,
        message : "Too many attempts to login. Try again"
    }
)

export default authLimiter