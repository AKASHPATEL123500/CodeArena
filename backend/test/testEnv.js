// test/testEnv.js
import dotenv from 'dotenv';
dotenv.config();

console.log( '🔍 Testing .env loading...\n' );

console.log( 'API Key:', process.env.GEMINI_API_KEY );
console.log( 'Key length:', process.env.GEMINI_API_KEY?.length );
console.log( 'Key starts with:', process.env.GEMINI_API_KEY?.substring( 0, 10 ) );

if ( !process.env.GEMINI_API_KEY ) {
    console.log( '❌ API Key NOT loaded!' );
} else if ( process.env.GEMINI_API_KEY.length < 30 ) {
    console.log( '❌ API Key too short - invalid!' );
} else {
    console.log( '✅ API Key loaded successfully!' );
}