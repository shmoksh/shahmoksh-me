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

// Enhanced system prompt with comprehensive portfolio data
const systemPrompt = `You are Moksh Shah's AI assistant. Here is comprehensive information about Moksh:

CURRENT ROLE: Software Engineer at Meta (June 2022 - Present)
- Developed 0→1 scalable platform, automating workflows and saving 3000+ hr/yr by unifying cross-functional processes
- Boosted decision speed by 40% with an Agentic AI for self-serve analytics, converting natural language to data visualizations
- Led org-wide query optimization, cutting fatal errors and improved API latency by 8s to 200ms enhanced reliability at scale
- Co-built a custom ETL framework (Airflow-like) to sync cross-platform data, powering 220+ pipelines with 99.9% uptime
- Implemented automatic SEV detection, enhancing product reliability and reducing downtime proactive issue resolution

PREVIOUS EXPERIENCE:
- Software Engineer Intern at Intel Corporation (Feb 2021 - Dec 2021)
- Software Engineer at Turabit Solution Pvt. Ltd. (Jul 2018 - Apr 2019)
- Software Engineer Intern at ConceptServe Technologies (Jan 2018 - Jul 2018)

PROJECTS:
- Stock Market WebApp (Feb 2021 - Apr 2021): RESTful APIs with 8,000+ companies' stock data, DynamoDB, real-time candlestick charts
- Network Intrusion Detection (Oct 2020 - Nov 2020): Predictive binary classification models (LR, KNN, SVM, NN)
- House Price Estimation (Sep 2020 - Oct 2020): End-to-end predictive model with 92% R² score

TECHNICAL SKILLS:
Programming Languages: Python, Java, Go, TypeScript, React, GraphQL, Rust, Kotlin, Node.js
Frameworks & Databases: Django, Flask, Next.js, Tailwind CSS, PostgreSQL, MongoDB, Redis, EntQL
DevOps & Cloud: Git, Docker, Kubernetes, Jenkins, Azure, AWS (EC2, S3, Lambda, ElasticSearch)
AI/ML & APIs: gRPC, REST API, Linux, GenAI, Machine Learning, Data Science

EDUCATION:
- MS Computer Science - California State University, Sacramento (2020-2022)
- BS Computer Engineering - Gujarat Technical University, India (2014-2018)

CONTACT: shahmoksh996@gmail.com, LinkedIn: mshah-17, GitHub: shmoksh, Phone: (916)598-6993

Instructions: Be helpful, concise, and professional. Provide specific, accurate information based on the data above. If asked about something not covered, politely redirect to relevant information that is available.`;

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

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'OpenAI API key not configured',
                details: 'Please set OPENAI_API_KEY environment variable in Netlify dashboard'
            })
        };
    }

    try {
        const { question } = JSON.parse(event.body);
        
        if (!question) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Question is required' })
            };
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            max_tokens: 800,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        });

        const response = completion.choices[0].message.content;
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response })
        };

    } catch (error) {
        console.error('OpenAI API Error:', error);
        
        // Handle specific OpenAI errors
        if (error.code === 'insufficient_quota') {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'OpenAI API quota exceeded',
                    details: 'Please check your OpenAI account billing'
                })
            };
        }
        
        if (error.code === 'invalid_api_key') {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Invalid OpenAI API key',
                    details: 'Please check your OPENAI_API_KEY environment variable'
                })
            };
        }
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Sorry, I encountered an error. Please try again.',
                details: error.message 
            })
        };
    }
}; 