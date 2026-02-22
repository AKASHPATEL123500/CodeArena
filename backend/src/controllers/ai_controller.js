// src/controllers/ai_controller.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiRespone } from '../utils/apiResponse.js';
import { Course } from '../models/course_model.js';
import { Lesson } from '../models/lession_model.js';
import { generateCourseOutline, generateLesson } from '../services/aiService.js';
/**
 * Generate single lesson
 * POST /api/v1/ai/generate-lesson
 */
export const aiGenerateLesson = asyncHandler( async ( req, res ) => {

    const { topic, language, courseSlug, difficulty, order } = req.body;

    // Validation
    if ( !topic || !language || !courseSlug ) {
        throw new ApiError( 400, "Topic, language, and courseSlug are required" );
    }

    // Find course
    const course = await Course.findOne( { slug: courseSlug } );
    if ( !course ) {
        throw new ApiError( 404, "Course not found" );
    }

    // Generate with AI
    const content = await generateLesson( topic, language, difficulty || 'beginner' );

    // Create slug
    const slug = topic.toLowerCase()
        .replace( /[^\w\s-]/g, '' )
        .replace( /\s+/g, '-' );

    // Save lesson
    const lesson = await Lesson.create( {
        course: course._id,
        title: topic,
        slug: slug,
        order: order || 1,
        content: content,
        estimatedTime: 20
    } );

    // Update course
    course.totalLessons += 1;
    await course.save();

    return res.status( 201 ).json(
        new ApiRespone( 201, { lesson }, "Lesson generated successfully" )
    );
} );

/**
 * Generate course outline (preview)
 * POST /api/v1/ai/generate-outline
 */
export const aiGenerateCourseOutline = asyncHandler( async ( req, res ) => {

    const { language, level } = req.body;

    if ( !language ) {
        throw new ApiError( 400, "Language is required" );
    }

    const outline = await generateCourseOutline( language, level || 'beginner' );

    return res.status( 200 ).json(
        new ApiRespone( 200, { outline }, "Course outline generated" )
    );
} );

/**
 * Generate complete course with all lessons
 * POST /api/v1/ai/generate-course
 */
export const aiGenerateCompleteCourse = asyncHandler( async ( req, res ) => {

    const { language, level } = req.body;

    if ( !language ) {
        throw new ApiError( 400, "Language is required" );
    }

    console.log( `🚀 Starting AI course generation for ${ language }...` );

    // Step 1: Generate outline
    const outline = await generateCourseOutline( language, level || 'beginner' );

    // Step 2: Create course
    const courseSlug = language.toLowerCase().replace( /\s+/g, '-' ) + '-complete-guide';

    const course = await Course.create( {
        title: outline.title,
        slug: courseSlug,
        language: language,
        description: outline.description,
        difficulty: level || 'beginner',
        totalLessons: 0,
        isPublished: false
    } );

    console.log( `✅ Course created: ${ course.title }` );

    // Step 3: Generate lessons
    let lessonCount = 0;

    for ( const module of outline.modules ) {
        for ( const lessonTitle of module.lessons ) {

            lessonCount++;
            console.log( `📝 Generating lesson ${ lessonCount }/${ outline.totalLessons }: ${ lessonTitle }` );

            try {
                const content = await generateLesson( lessonTitle, language, level );

                const slug = lessonTitle.toLowerCase()
                    .replace( /[^\w\s-]/g, '' )
                    .replace( /\s+/g, '-' );

                await Lesson.create( {
                    course: course._id,
                    title: lessonTitle,
                    slug: slug,
                    order: lessonCount,
                    content: content,
                    estimatedTime: 20
                } );

                console.log( `✅ Lesson ${ lessonCount } saved!` );

                // Delay to avoid rate limits
                await new Promise( resolve => setTimeout( resolve, 1000 ) );

            } catch ( error ) {
                console.error( `❌ Failed: ${ lessonTitle }`, error.message );
            }
        }
    }

    // Step 4: Finalize
    course.totalLessons = lessonCount;
    course.isPublished = true;
    await course.save();

    console.log( `🎉 Course complete! ${ lessonCount } lessons generated.` );

    return res.status( 201 ).json(
        new ApiRespone(
            201,
            { course, lessonsGenerated: lessonCount },
            "Complete course generated successfully"
        )
    );
} );

export default {
    aiGenerateLesson,
    aiGenerateCourseOutline,
    aiGenerateCompleteCourse
};