import express from "express"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import dotenv from "dotenv"
import cors from 'cors';
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth_route.js"
import globalErrorHandler from "./middlewares/global_Error_Handler.js"
import userRouter from "./routes/user_route.js"
import skillRouter from "./routes/skill_route.js"
import goalRouter from "./routes/goal.route.js";
import courseRouter from "./routes/course.route.js";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import aiRouter from "./routes/ai.route.js";
dotenv.config()
const app = express()

app.use( express.json() )
app.use( cookieParser() )


// Configure CORS origins from env (comma-separated) and allow local dev host
const rawCors = process.env.CORS_ORIGIN || '';
const allowedOrigins = rawCors.split( ',' ).map( s => s.trim() ).filter( Boolean );
if ( !allowedOrigins.includes( 'http://localhost:5173' ) ) allowedOrigins.push( 'http://localhost:5173' );

console.log( 'CORS allowed origins:', allowedOrigins );

app.use( cors( {
    origin: function ( origin, callback ) {
        // allow requests with no origin (like curl, server-to-server)
        if ( !origin ) return callback( null, true );
        if ( allowedOrigins.indexOf( origin ) !== -1 ) return callback( null, true );
        return callback( new Error( 'CORS policy: origin not allowed' ), false );
    },
    credentials: true
} ) );


const openRouter = createOpenRouter( {
    apiKey: process.env.OPEN_ROUTER
} )


// ============================================================
// ONLY REPLACE the /chat-stream route in your app.js
// ============================================================

app.post( "/api/v1/chat-stream", async ( req, res ) => {
    try {
        // Diagnostic: ensure OPEN_ROUTER is configured in production
        if ( !process.env.OPEN_ROUTER ) {
            console.error( 'OPEN_ROUTER API key is NOT set in environment!' );
            return res.status( 500 ).json( { message: 'AI not configured on server. Missing OPEN_ROUTER key.' } );
        }

        // Log origin and a short preview of message for debugging (no secrets)
        console.log( 'Chat stream request from origin:', req.headers.origin );
        if ( req.body && req.body.message ) console.log( 'Chat message preview:', String( req.body.message ).slice( 0, 120 ) );

        const { message, history = [], model } = req.body;
        if ( !message ) return res.status( 400 ).json( { error: "Message is required" } );

        res.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
        res.setHeader( 'Transfer-Encoding', 'chunked' );
        res.setHeader( 'Cache-Control', 'no-cache' );
        res.setHeader( 'Connection', 'keep-alive' );

        // ✅ MODEL FIX — gpt-3.5-turbo bahut weak hai, ye use karo
        // Priority order (sabse achhe pehle):
        // 1. claude-3-haiku   — fast + detailed (best value)
        // 2. gpt-4o-mini      — gpt-3.5 se 10x better, almost same price  
        // 3. mistral-7b       — free tier mein achha
        const selectedModel = model || 'anthropic/claude-3-haiku';
        // Alternatives:
        // 'openai/gpt-4o-mini'
        // 'mistralai/mistral-7b-instruct'
        // 'anthropic/claude-3.5-haiku'
        // 'google/gemini-flash-1.5'

        const systemPrompt = `You are CodeArena AI — a senior software engineer with 15+ years of experience. You write COMPLETE, PRODUCTION-READY code.

STRICT RULES — NEVER BREAK THESE:

1. COMPLETE CODE ONLY
   - NEVER write partial code
   - NEVER use "..." or "// rest of code here" or "// add more here"
   - NEVER say "I'll keep it brief" or "simplified version"
   - Every file must be complete from line 1 to the last line
   - If building HTML/CSS/JS — write the ENTIRE thing, every single line

2. WHEN ASKED TO BUILD SOMETHING (website, app, component, API):
   - Start with a brief 2-line overview
   - Then write the COMPLETE code — nothing omitted
   - After code, explain key decisions in 3-5 bullet points
   - Suggest improvements at the end

3. CODE QUALITY:
   - HTML/CSS: Beautiful, modern, responsive design. Proper colors, animations, hover effects, gradients. NOT bare HTML.
   - JavaScript: Clean, modern ES6+, error handling included
   - Always specify language in code blocks: \`\`\`html \`\`\`css \`\`\`javascript \`\`\`python etc.
   - Add helpful comments inside code

4. EXPLANATION DEPTH:
   - For concepts: Give full explanation with 3+ real examples
   - For debugging: Show the broken code, explain WHY it broke, show fixed code
   - For comparisons: Use a table + explain each difference
   - Never give a one-paragraph answer when the topic deserves more

5. RESPONSE LENGTH:
   - Build requests: As long as needed — 200 lines, 500 lines, whatever it takes
   - Explanations: Thorough — minimum 400 words for any non-trivial topic
   - NEVER truncate. NEVER summarize when full content is needed.

PERSONALITY: Direct, expert, like a senior dev doing a code review with you.`;

        const formattedMessages = history
            .filter( msg => msg.content && msg.content.trim() )
            .map( msg => ( { role: msg.role, content: msg.content } ) );

        formattedMessages.push( { role: 'user', content: message } );

        const response = await streamText( {
            model: openRouter( selectedModel ),
            system: systemPrompt,
            messages: formattedMessages,
            maxTokens: 20000,       // max rakho — model ki limit tak
            temperature: 0.2,       // ⬇️ LOW temperature = more focused, detailed output
            topP: 0.9,
        } );

        for await ( const chunk of response.textStream ) {
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
} );


// // Helper function to detect message type
// function detectMessageType( message ) {
//     const lowerMessage = message.toLowerCase();

//     if ( lowerMessage.includes( 'code' ) || lowerMessage.includes( 'function' ) ||
//         lowerMessage.includes( 'algorithm' ) || lowerMessage.includes( 'debug' ) ) {
//         return 'coding';
//     }

//     if ( lowerMessage.includes( 'how to' ) || lowerMessage.includes( 'tutorial' ) ||
//         lowerMessage.includes( 'step by step' ) ) {
//         return 'tutorial';
//     }

//     if ( lowerMessage.includes( 'what is' ) || lowerMessage.includes( 'explain' ) ||
//         lowerMessage.includes( 'difference between' ) ) {
//         return 'explanation';
//     }

//     return 'general';
// }

app.get( "/", ( req, res ) => {
    res.send( "open router api is running" )
} )


app.use( "/api/v1/auth/", authRouter )
app.use( "/api/v1/user/", userRouter )
app.use( "/api/v1/skill/", skillRouter )
app.use( "/api/v1/goal/", goalRouter )
app.use( "/api/v1/course/", courseRouter )
app.use( "/api/v1/ai/", aiRouter )

app.use( helmet() )
app.use( mongoSanitize() )
app.use( globalErrorHandler )

export { app }
