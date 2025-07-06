const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Load about.txt content
const fs = require('fs');
let aboutContent = '';
try {
    aboutContent = fs.readFileSync('about.txt', 'utf8');
} catch (error) {
    console.log('about.txt not found, using default content');
    aboutContent = 'Moksh Shah - Software Engineer at Meta';
}

// System prompt based on about.txt
const systemPrompt = `You are an AI assistant for Moksh Shah's portfolio website. You have access to the following information about Moksh:

${aboutContent}

Please provide helpful, accurate responses about Moksh's background, experience, skills, and projects. Keep responses concise and professional. If asked about something not covered in the provided information, politely redirect to topics you can help with.`;

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { message } = JSON.parse(event.body);
        
        if (!message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message is required' })
            };
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 500,
            temperature: 0.7
        });

        const response = completion.choices[0].message.content;
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response })
        };

    } catch (error) {
        console.error('OpenAI API Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Sorry, I encountered an error. Please try again.' 
            })
        };
    }
}; 