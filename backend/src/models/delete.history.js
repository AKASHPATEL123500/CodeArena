import mongoose, { Schema } from "mongoose";

const deleteHistorySchema = new Schema( {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    deletedAt: {
        type: Date,
        default: Date.now
    },
    reason: {
        type: String,
        enum: [ "user_request", "inactivity", "violation_of_terms", "other" ],
    },
    additionalInfo: {
        type: String
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    firstSeen: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletionMethod: {
        type: String,
        enum: [ "self_service", "admin_action", "automated_system" ],
        default: "self_service"
    }
}, { timestamps: true } )

export const DeleteHistory = mongoose.model( "DeleteHistory", deleteHistorySchema )