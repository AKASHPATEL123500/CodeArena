import { Course } from "../models/course_model.js";
import { Lesson } from "../models/lession_model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRespone } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all courses
export const getAllCourses = asyncHandler( async ( req, res ) => {
    const courses = await Course.find( { isPublished: true } )
        .sort( { createdAt: -1 } );

    return res.status( 200 ).json(
        new ApiRespone( 200, { courses }, "Courses fetched" )
    );
} );

// Get single course
export const getCourseBySlug = asyncHandler( async ( req, res ) => {
    const { slug } = req.params;

    const course = await Course.findOne( { slug, isPublished: true } );

    if ( !course ) {
        throw new ApiError( 404, "Course not found" );
    }

    // Get lessons
    const lessons = await Lesson.find( { course: course._id } )
        .sort( { order: 1 } )
        .select( 'title slug order estimatedTime' );

    return res.status( 200 ).json(
        new ApiRespone( 200, { course, lessons }, "Course fetched" )
    );
} );

// Get lesson
export const getLessonBySlug = asyncHandler( async ( req, res ) => {
    const { courseSlug, lessonSlug } = req.params;

    const course = await Course.findOne( { slug: courseSlug } );
    if ( !course ) throw new ApiError( 404, "Course not found" );

    const lesson = await Lesson.findOne( {
        course: course._id,
        slug: lessonSlug
    } );

    if ( !lesson ) throw new ApiError( 404, "Lesson not found" );

    return res.status( 200 ).json(
        new ApiRespone( 200, { lesson }, "Lesson fetched" )
    );
} );