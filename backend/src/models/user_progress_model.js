// models/UserProgress.js
import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema( {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completedLessons: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    } ],
    currentLesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true } );

export const UserProgress = mongoose.model( 'UserProgress', progressSchema );