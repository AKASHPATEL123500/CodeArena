import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async()=>{
    try {
        const connectObject = await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected Successfully");
        console.log("DB host : ",connectObject.connection.host);
    } catch (error) {
        console.log("Db connected Error : ",error.message);
        process.exit(1)
    }
}

export default connectDB