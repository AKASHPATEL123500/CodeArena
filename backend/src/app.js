import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth_route.js"
import globalErrorHandler from "./middlewares/global_Error_Handler.js"
import userRouter from "./routes/user_route.js"
import skillRouter from "./routes/skill_route.js"
dotenv.config()
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth/",authRouter)
app.use("/api/v1/user/",userRouter)
app.use("/api/v1/skill/",skillRouter)



app.use(globalErrorHandler)

export { app }
