import mongoose, { Mongoose } from "mongoose";

const userLogs = new mongoose.Schema( {
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },

    location: [
        {
            countiry: {
                name: {
                    type: String,
                    required: true,
                    trim: true
                },

            }
        }
    ]
}, { timestamps } )