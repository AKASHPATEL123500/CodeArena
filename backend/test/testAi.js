// test/testAi.js
import dotenv from 'dotenv';
dotenv.config();

import { generateLesson, generateCourseOutline, generateExercises } from '../src/services/aiService.js';

async function testAI() {
    try {
        console.log( '🧪 Testing OpenRouter AI Service...\n' );

        // Test 1: Generate Lesson
        console.log( '📝 Test 1: Generating lesson...\n' );
        const lesson = await generateLesson(
            'JavaScript Variables',
            'JavaScript',
            'beginner'
        );

        console.log( 'Lesson Preview (first 500 chars):' );
        console.log( lesson.substring( 0, 500 ) + '...\n' );

        // Test 2: Generate Course Outline
        console.log( '📚 Test 2: Generating course outline...\n' );
        const outline = await generateCourseOutline( 'Python', 'beginner' );

        console.log( 'Course:', outline.title );
        console.log( 'Modules:', outline.modules.length );
        console.log( 'Total Lessons:', outline.totalLessons );
        console.log( '\nFirst module:', outline.modules[ 0 ].name );
        console.log( 'Lessons:', outline.modules[ 0 ].lessons.slice( 0, 3 ).join( ', ' ) );

        // Test 3: Generate Exercises
        console.log( '\n💪 Test 3: Generating exercises...\n' );
        const exercises = await generateExercises( 'Arrays', 'JavaScript', 2 );

        console.log( 'Exercises generated:', exercises.length );
        console.log( '\nFirst exercise:' );
        console.log( 'Q:', exercises[ 0 ].question );
        console.log( 'Hint:', exercises[ 0 ].hint );

        console.log( '\n🎉 All tests passed!' );

    } catch ( error ) {
        console.error( '❌ Test failed:', error.message );
    }
}

testAI();