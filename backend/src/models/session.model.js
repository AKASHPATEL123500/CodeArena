import mongoose, { model, Schema } from "mongoose"

const sessionSchema = new Schema( {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "User"
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    refreshToken: {
        type: String,
        index: true,
        required: true,
    },
    deviceFingerprint: {
        type: String
    },
    IP: {
        type: String
    },
    userAgent: {
        type: String
    },
    lastUsed: {
        type: Date,
        default: Date.now
    },
    inValid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true } )


sessionSchema.index( { createdAt: 1 }, { expireAfterSeconds: 15 * 24 * 60 * 60 } )


export const SessionTrack = mongoose.model( "SessionTrack", sessionSchema )