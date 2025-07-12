// Test script to verify API functionality
const fetch = require('node-fetch');

async function testAPI() {
    const testData = {
        question: "Tell me about Moksh's experience at Meta"
    };

    try {
        console.log('🧪 Testing API endpoint...');
        
        // Test local development server
        const localResponse = await fetch('http://localhost:3001/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        if (localResponse.ok) {
            const localData = await localResponse.json();
            console.log('✅ Local API working:', localData.response.substring(0, 100) + '...');
        } else {
            console.log('❌ Local API failed:', localResponse.status);
        }

        // Test Netlify function (if deployed)
        const netlifyResponse = await fetch('https://your-site.netlify.app/.netlify/functions/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        if (netlifyResponse.ok) {
            const netlifyData = await netlifyResponse.json();
            console.log('✅ Netlify API working:', netlifyData.response.substring(0, 100) + '...');
        } else {
            console.log('❌ Netlify API failed:', netlifyResponse.status);
            const errorData = await netlifyResponse.json();
            console.log('Error details:', errorData);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testAPI();
}

module.exports = { testAPI }; 