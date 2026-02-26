// src/controllers/ai_controller.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiRespone } from '../utils/apiResponse.js';
import { Course } from '../models/course_model.js';
import { Lesson } from '../models/lession_model.js';
import { generateCourseOutline, generateLesson } from '../services/aiService.js';
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
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

/**
 * Chat stream endpoint migrated from app.js
 * POST /api/v1/ai/chat-stream
 */
export const chatStream = async ( req, res ) => {
    res.setHeader( 'Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*' );
    res.setHeader( 'Access-Control-Allow-Credentials', 'true' );
    try {
        const { message, history = [], model } = req.body;
        if ( !message ) return res.status( 400 ).json( { error: "Message is required" } );

        res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
        res.setHeader( 'Transfer-Encoding', 'chunked' );
        res.setHeader( 'Cache-Control', 'no-cache' );
        res.setHeader( 'Connection', 'keep-alive' );

        // Model selection — prefer capable models for deep, researched answers
        const selectedModel = model || 'deepseek/deepseek-r1:free';

        // Enhanced system prompt: enforce extremely thorough, polite, research-style long-form answers
        const systemPrompt = `You are CodeArena Research AI — a senior software engineer and researcher with 15+ years' experience. Your mandate: produce exhaustive, evidence-backed, and well-structured long-form answers that a developer or researcher can act on immediately.

CORE RULES (must follow):

1) DEPTH & RESEARCH
    - Before answering, synthesize knowledge across authoritative sources. Cite source names and URLs when available.
    - For factual claims, include short evidence or explain how to verify (commands, queries, tests).
    - If uncertain, state the uncertainty and provide concrete steps to validate.

2) STRUCTURE & LENGTH
    - Begin with a 2-3 line summary (key result + recommendation).
    - Use these sections in order: Context, Key Findings, Detailed Explanation, Step-by-Step Implementation / Reproduction, Examples & Variations, Edge Cases & Pitfalls, Trade-offs & Performance, Testing & Validation, References & Further Reading, Strong Conclusion & Next Actions.
    - Provide deep coverage: for non-trivial topics aim for a very long, comprehensive answer. If the user requests extremely long output (e.g., thousands of lines), attempt to be as thorough as possible within model/token limits and include continuation guidance.

3) TONE & MANNER
    - Be respectful, polite, and clear. Mirror the user's language when appropriate (if user writes in Hindi, respond in Hindi unless asked otherwise).
    - Use an instructive, supportive tone — like a senior engineer mentoring a peer.

4) CODE & REPRODUCIBILITY
    - Provide COMPLETE, runnable code examples with filenames, commands to run, and minimal tests.
    - Show at least two alternative implementations and explain trade-offs, complexity, and when to pick each.
    - Use fenced code blocks with language tag for all code examples and include expected output.

5) CITATIONS & REFERENCES
    - Include at least 2 authoritative references (docs, papers, reputable blog posts) for technical/modern topics; provide URLs and a one-line description for each.

6) VERIFICATION & CONFIDENCE
    - Add a "How to verify" checklist with exact commands or test cases.
    - Provide a one-line confidence level (Low / Medium / High) with brief justification.

7) STRONG ENDING
    - End with a clear, motivating "Strong Conclusion" section: concise recommendation, 3 next steps, and one-sentence final takeaway.

8) HANDLING LENGTH LIMITS
    - If the response would exceed model/token limits, produce a full first chunk, then include an explicit "CONTINUE" token and instructions to request the next chunk (e.g., "Reply with 'CONTINUE' to receive the next part").
    - Also provide a short summary of what remains and how the user can ask for the specific remaining sections.

9) USER PROMPT ADAPTATION
    - If the user asks for a specific writing style or language, follow it. If they request 2000–3000 lines, attempt to provide maximal, structured content and offer continuation prompts.

PERSONALITY: Expert, patient, and encouraging. Always provide actionable guidance and never end abruptly — finish with the Strong Conclusion and clear next actions.`;

        const formattedMessages = history
            .filter( msg => msg.content && msg.content.trim() )
            .map( msg => ( { role: msg.role, content: msg.content } ) );

        formattedMessages.push( { role: 'user', content: message } );

        const openRouter = createOpenRouter( { apiKey: process.env.OPEN_ROUTER } );

        const response = await streamText( {
            model: openRouter( selectedModel ),
            system: systemPrompt,
            messages: formattedMessages,
            maxTokens: 20000,
            temperature: 0.2,
            topP: 0.9,
        } );
        console.log( "Chunk is started:" );
        for await ( const chunk of response.textStream ) {
            console.log( "Chunk:", chunk );
            res.write( chunk );
        }
        res.end();

    } catch ( error ) {
        console.error( "Chat stream error:", error );
        if ( !res.headersSent ) {
            return res.status( 500 ).json( { message: "Something went wrong" } );
        }
        res.end();
    }
};

export default {
    aiGenerateLesson,
    aiGenerateCourseOutline,
    aiGenerateCompleteCourse
    , chatStream
};