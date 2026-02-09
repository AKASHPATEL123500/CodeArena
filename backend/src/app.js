import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth_route.js"
import globalErrorHandler from "./middlewares/global_Error_Handler.js"
import userRouter from "./routes/user_route.js"
dotenv.config()
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth/",authRouter)
app.use("/api/v1/user/",userRouter)


app.get("/",(req,res)=>{
    res.send("<h1>Hello from code arena<h1/>")
})


app.use(globalErrorHandler)

export { app }
