import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth_route.js"
dotenv.config()
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth/",authRouter)

app.get("/",(req,res)=>{
    res.send("<h1>Hello from code arena<h1/>")
})

export { app }
