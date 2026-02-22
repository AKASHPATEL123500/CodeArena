// test/curlTest.js
import dotenv from 'dotenv';
dotenv.config();


async function testWithFetch() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${ process.env.GEMINI_API_KEY }`;
    try {
        console.log( '🧪 Testing API with fetch...\n' );

        const response = await fetch( url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                contents: [ {
                    parts: [ { text: 'Say hi!' } ]
                } ]
            } )
        } );

        console.log( 'Status:', response.status );

        const data = await response.json();
        console.log( '\nResponse:', JSON.stringify( data, null, 2 ) );

        if ( response.ok ) {
            console.log( '\n✅ API WORKS!' );
            console.log( 'Text:', data.candidates[ 0 ].content.parts[ 0 ].text );
        } else {
            console.log( '\n❌ API Error!' );
        }

    } catch ( error ) {
        console.error( '❌ Fetch Error:', error );
    }
}

testWithFetch();