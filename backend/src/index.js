import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 16000


app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is live on http://localhost:${PORT}`);
})