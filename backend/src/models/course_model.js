// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    language: {
        type: String,
        required: true  // "JavaScript", "Python", etc.
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String  // Image URL
    },
    difficulty: {
        type: String,
        enum: [ 'beginner', 'intermediate', 'advanced' ],
        default: 'beginner'
    },
    totalLessons: {
        type: Number,
        default: 0
    },
    enrolledCount: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true } );

export const Course = mongoose.model( 'Course', courseSchema );