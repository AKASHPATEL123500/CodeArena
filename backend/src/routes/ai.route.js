// src/routes/ai.route.js
import express from 'express';
import {
    aiGenerateLesson,
    aiGenerateCourseOutline,
    aiGenerateCompleteCourse,
    chatStream
} from '../controllers/ai_controller.js';

const aiRouter = express.Router();

// Generate single lesson
aiRouter.post( '/generate-lesson', aiGenerateLesson );

// Generate course outline (preview)
aiRouter.post( '/generate-outline', aiGenerateCourseOutline );

// Generate complete course
aiRouter.post( '/generate-course', aiGenerateCompleteCourse );

// Chat stream (server-sent chunks)
aiRouter.post( '/chat-stream', chatStream );

export default aiRouter;