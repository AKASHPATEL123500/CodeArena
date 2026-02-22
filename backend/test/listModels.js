// test/listModels.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function listAvailableModels() {
    try {
        console.log( '📋 Checking available Gemini models...\n' );

        const genAI = new GoogleGenerativeAI( process.env.GEMINI_API_KEY );

        // Try to list models
        console.log( 'Attempting to list models...\n' );

        // Method 1: Try common models
        const modelsToTry = [
            'gemini-pro',
            'gemini-1.0-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'gemini-1.5-pro-latest'
        ];

        console.log( 'Testing common model names:\n' );

        for ( const modelName of modelsToTry ) {
            try {
                const model = genAI.getGenerativeModel( { model: modelName } );
                const result = await model.generateContent( 'Test' );
                console.log( `✅ ${ modelName } - WORKS!` );
            } catch ( error ) {
                console.log( `❌ ${ modelName } - ${ error.message.split( '\n' )[ 0 ] }` );
            }
        }

    } catch ( error ) {
        console.error( 'Error:', error.message );
    }
}

listAvailableModels();