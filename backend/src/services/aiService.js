// src/services/aiService.js
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import dotenv from "dotenv";
dotenv.config()
// Initialize OpenRouter
const openRouter = createOpenRouter( {
    apiKey: process.env.OPEN_ROUTER
} );

/**
 * Generate lesson content using AI
 * @param {string} topic - Lesson topic
 * @param {string} language - Programming language
 * @param {string} difficulty - beginner/intermediate/advanced
 * @returns {Promise<string>} - Generated lesson in markdown
 */
export const generateLesson = async ( topic, language, difficulty = 'beginner' ) => {

    const prompt = `You are a friendly coding instructor creating educational content for students.

Create a DETAILED lesson on: "${ topic }" for ${ language } programming language.
Difficulty level: ${ difficulty }

IMPORTANT GUIDELINES:
1. Use SIMPLE, friendly language (like talking to a friend)
2. Use emojis to make it engaging (🎯, 💡, ✅, ❌, etc.)
3. Start with "What is..." explanation
4. Include "Why learn this?" section
5. Provide 3-4 code examples with explanations
6. Add 2-3 practice exercises with solutions
7. Include common mistakes section
8. End with key takeaways

FORMAT IN MARKDOWN:
- Use # for main heading
- Use ## for sections
- Use \`\`\`${ language.toLowerCase() }\`\`\` for code blocks
- Use bold (**text**) and italic (*text*) appropriately
- Keep total length: 1000-1500 words

SECTIONS TO INCLUDE:
1. Introduction (What is ${ topic }?)
2. Why Learn This?
3. Basic Concept Explanation
4. Code Examples (with detailed comments)
5. Real-World Use Cases
6. Common Mistakes to Avoid
7. Practice Exercises (with solutions)
8. Key Takeaways

Make it exciting and easy to understand for ${ difficulty } level students!`;

    try {
        console.log( `🤖 Generating lesson: "${ topic }" for ${ language }...` );

        const response = await generateText( {
            model: openRouter( 'openai/gpt-3.5-turbo' ),
            prompt: prompt,
            temperature: 0.7,
            maxTokens: 2500
        } );

        const content = response.text;

        console.log( '✅ Lesson generated successfully!' );
        console.log( `   Length: ${ content.length } characters` );

        return content;

    } catch ( error ) {
        console.error( '❌ AI Generation Error:', error );
        throw new Error( 'Failed to generate lesson: ' + error.message );
    }
};

/**
 * Generate course outline
 * @param {string} language - Programming language
 * @param {string} level - beginner/intermediate/advanced
 * @returns {Promise<object>} - Course outline with modules
 */
export const generateCourseOutline = async ( language, level = 'beginner' ) => {

    const prompt = `You are a curriculum designer creating a complete course outline.

Create a COMPLETE course outline for learning ${ language } (${ level } level).

RESPOND WITH VALID JSON ONLY (no markdown, no extra text):
{
    "title": "Complete course title",
    "description": "2-line description of what students will learn",
    "modules": [
        {
            "name": "Module 1: Fundamentals",
            "lessons": [
                "Lesson 1 title",
                "Lesson 2 title",
                "Lesson 3 title"
            ]
        },
        {
            "name": "Module 2: Intermediate Concepts",
            "lessons": [
                "Lesson 1 title",
                "Lesson 2 title"
            ]
        }
    ],
    "totalLessons": 30,
    "estimatedDuration": "6 weeks"
}

REQUIREMENTS:
- Create 4-6 modules
- Each module: 5-8 lessons
- Total: 25-40 lessons
- Logical progression (easy → advanced)
- Clear, descriptive lesson titles
- Cover all important topics for ${ level } level

RESPOND ONLY WITH VALID JSON - NO MARKDOWN BACKTICKS!`;

    try {
        console.log( `🤖 Generating course outline for ${ language }...` );

        const response = await generateText( {
            model: openRouter( 'openai/gpt-3.5-turbo' ),
            prompt: prompt,
            temperature: 0.5,
            maxTokens: 2000
        } );

        let content = response.text;

        // Clean markdown if present
        content = content.replace( /```json\n?/g, '' ).replace( /```\n?/g, '' ).trim();

        // Parse JSON
        const outline = JSON.parse( content );

        console.log( '✅ Course outline generated!' );
        console.log( `   Modules: ${ outline.modules.length }` );
        console.log( `   Total Lessons: ${ outline.totalLessons }` );

        return outline;

    } catch ( error ) {
        console.error( '❌ Error generating outline:', error );
        throw new Error( 'Failed to generate course outline: ' + error.message );
    }
};

/**
 * Generate practice exercises
 * @param {string} topic - Topic for exercises
 * @param {string} language - Programming language
 * @param {number} count - Number of exercises
 * @returns {Promise<Array>} - Array of exercises
 */
export const generateExercises = async ( topic, language, count = 3 ) => {

    const prompt = `Create ${ count } practice exercises for: "${ topic }" in ${ language }.

RESPOND WITH VALID JSON ONLY (no markdown):
[
    {
        "question": "Clear, specific question/task",
        "hint": "Helpful hint without giving away answer",
        "solution": "Complete solution with code and explanation"
    },
    {
        "question": "Question 2",
        "hint": "Hint 2",
        "solution": "Solution 2"
    }
]

REQUIREMENTS:
- Start easy, increase difficulty
- Practical, hands-on tasks
- Include code in solutions
- Explain the solution approach
- Beginner-friendly

RESPOND ONLY WITH VALID JSON ARRAY!`;

    try {
        console.log( `🤖 Generating ${ count } exercises for ${ topic }...` );

        const response = await generateText( {
            model: openRouter( 'openai/gpt-3.5-turbo' ),
            prompt: prompt,
            temperature: 0.6,
            maxTokens: 1500
        } );

        let content = response.text;

        // Clean markdown
        content = content.replace( /```json\n?/g, '' ).replace( /```\n?/g, '' ).trim();

        const exercises = JSON.parse( content );

        console.log( `✅ Generated ${ exercises.length } exercises!` );

        return exercises;

    } catch ( error ) {
        console.error( '❌ Error generating exercises:', error );
        throw new Error( 'Failed to generate exercises: ' + error.message );
    }
};

// Export all functions
export default {
    generateLesson,
    generateCourseOutline,
    generateExercises
};