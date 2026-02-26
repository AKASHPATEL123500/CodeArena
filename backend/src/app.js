import express from "express"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import dotenv from "dotenv"
import cors from 'cors';
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth_route.js"
import globalErrorHandler from "./middlewares/global_Error_Handler.js"
import userRouter from "./routes/user_route.js"
import skillRouter from "./routes/skill_route.js"
import goalRouter from "./routes/goal.route.js";
import courseRouter from "./routes/course.route.js";
import aiRouter from "./routes/ai.route.js";
import redis from "./config/redis.js";
dotenv.config()
const app = express()

app.use( cors( {
    origin: [
        process.env.CORS_ORIGIN,
        'http://localhost:5173',
        'https://code-arena-seven.vercel.app'
    ],
    credentials: true
} ) );


app.use( helmet() )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( cookieParser() )
// app.use( mongoSanitize( {
//     replaceWith: '_',
//     allowDots: true,
//     onSanitize: false
// } ) )


app.use( "/api/v1/auth/", authRouter )
app.use( "/api/v1/user/", userRouter )
app.use( "/api/v1/skill/", skillRouter )
app.use( "/api/v1/goal/", goalRouter )
app.use( "/api/v1/course/", courseRouter )
app.use( "/api/v1/ai/", aiRouter )

app.use( globalErrorHandler )

export { app }
