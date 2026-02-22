// models/Lesson.js
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema( {
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    content: {
        type: String,  // Full lesson text (markdown)
        required: true
    },
    estimatedTime: {
        type: Number,  // Minutes
        default: 10
    }
}, { timestamps: true } );

export const Lesson = mongoose.model( 'Lesson', lessonSchema );