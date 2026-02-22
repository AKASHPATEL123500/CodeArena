import 'dotenv/config';

async function getMyModels() {
    const key = process.env.GEMINI_API_KEY;
    // We check the base models endpoint
    const url = `https://generativelanguage.googleapis.com{key}`;

    try {
        const response = await fetch( url );
        const data = await response.json();

        if ( data.models ) {
            console.log( "✅ These are the ONLY models you can use:" );
            data.models.forEach( m => {
                // Look for the ones that have 'generateContent'
                if ( m.supportedGenerationMethods.includes( 'generateContent' ) ) {
                    console.log( `- ${ m.name }` );
                }
            } );
        } else {
            console.log( "❌ No models found. Response:", data );
        }
    } catch ( err ) {
        console.error( "❌ Fetch failed:", err.message );
    }
}

getMyModels();
