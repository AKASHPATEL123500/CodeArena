// routes/courseRoutes.js
import express from 'express';
import {
    getAllCourses,
    getCourseBySlug,
    getLessonBySlug
} from '../controllers/course_controller.js';

const courseRouter = express.Router();

courseRouter.get( '/', getAllCourses );
courseRouter.get( '/:slug', getCourseBySlug );
courseRouter.get( '/:courseSlug/lessons/:lessonSlug', getLessonBySlug );

export default courseRouter;