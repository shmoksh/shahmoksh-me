// API Service Module
export class APIService {
    constructor() {
        this.baseURL = '/api';
        // Define Moksh-related keywords and topics
        this.mokshTopics = {
            personal: ['moksh', 'shah', 'myself', 'me', 'about', 'who', 'background', 'bio'],
            companies: ['meta', 'facebook', 'intel', 'conceptserve', 'turabit'],
            roles: ['software engineer', 'intern', 'developer', 'engineer'],
            education: ['california state university', 'sacramento', 'gujarat technical university', 'ms computer science', 'bs computer engineering', 'education', 'degree'],
            skills: ['python', 'java', 'javascript', 'react', 'go', 'rust', 'typescript', 'kotlin', 'django', 'flask', 'aws', 'docker', 'kubernetes', 'machine learning', 'ai', 'ml', 'api', 'rest', 'graphql'],
            projects: ['stock market', 'webapp', 'intrusion detection', 'house price', 'estimation', 'url shorty', 'esignature', 'calpers', 'project'],
            achievements: ['3000', '40%', '200ms', '8s', 'automation', 'ai', 'performance', 'optimization', 'pipeline', 'uptime'],
            contact: ['email', 'phone', 'linkedin', 'github', 'contact', 'reach', 'connect'],
            experience: ['experience', 'job', 'work', 'career', 'employment', 'meta', 'intel', 'company', 'role', 'position']
        };
    }

    // Check if query is related to Moksh's content
    isMokshRelated(query) {
        const lowerQuery = query.toLowerCase();
        
        // Check if query contains any Moksh-related keywords
        for (const category in this.mokshTopics) {
            for (const keyword of this.mokshTopics[category]) {
                if (lowerQuery.includes(keyword)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    // Get fallback reply for unrelated queries
    getFallbackReply() {
        return `I can only answer questions about my background, experience, and expertise. 

Here are some topics you can ask me about:
• My work at Meta and previous companies
• My technical skills and projects
• My education and background
• My achievements and impact
• How to contact me

Try asking something like:
- "Tell me about your work at Meta"
- "What projects have you built?"
- "What are your technical skills?"
- "How can I contact you?"`;
    }

    // Check if query should use predefined response
    shouldUsePredefinedResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes('me') || lowerQuery.includes('about') || lowerQuery.includes('who')) {
            return 'me';
        }
        if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('build')) {
            return 'projects';
        }
        if (lowerQuery.includes('experience') || lowerQuery.includes('job') || lowerQuery.includes('work') || lowerQuery.includes('meta') || lowerQuery.includes('intel')) {
            return 'experience';
        }
        if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
            return 'skills';
        }
        if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
            return 'contact';
        }
        
        return null;
    }

    // Get predefined response
    getPredefinedResponse(sectionType) {
        const data = {
            me: `👨‍💻 Software Engineer at Meta

Passionate engineer specializing in scalable platforms, AI/ML, and performance optimization. Built 0→1 platforms saving 3000+ hr/yr and boosted decision speed by 40% with Agentic AI.

🎯 Key Impact
- Developed scalable platform automating workflows (3000+ hr/yr saved)
- Built Agentic AI boosting decision speed by 40%
- Improved API latency from 8s to 200ms
- Co-built ETL framework powering 220+ pipelines (99.9% uptime)

🎓 Education
**MS Computer Science** - California State University, Sacramento
**BS Computer Engineering** - Gujarat Technical University, India`,
            
            projects: `🚀 Featured Projects

Showcasing technical expertise across full-stack development, ML, and data science:

📈 Stock Market WebApp
RESTful APIs with 8,000+ companies' stock data in DynamoDB. Real-time candlestick charts and API authentication.

🛡️ Network Intrusion Detection
ML models (LR, KNN, SVM, NN) for threat detection with feature engineering and correlation analysis.

🏠 House Price Estimation
End-to-end ML pipeline achieving 92% R² score using feature scaling, encoding, and cross-validation.`,
            
            experience: `💼 Professional Journey

Progressive experience at leading tech companies:

🚀 Meta (2022-Present)
Software Engineer developing scalable platforms and AI solutions. Key achievements: 3000+ hr/yr automation, 40% faster decisions with AI, 8s→200ms API optimization.

⚡ Intel Corporation (2021)
Software Engineer Intern focused on automation and testing. Improved execution time by 40% and team productivity by 35%.

🤖 Turabit Solution (2018-2019)
Built AI chatbot reducing 80% of IT tasks. Improved integration efficiency by 40% with secure REST APIs and Stripe integration.

💬 ConceptServe Technologies (2018)
Developed scalable social media app with CRUD operations and OTP-based 2FA for enhanced security.`,
            
            skills: `🛠️ Technical Expertise

Comprehensive skills across modern development stack:

💻 Programming Languages
Advanced: Python, Java, TypeScript, React. Intermediate: Go, Rust, Kotlin. Expertise in data science, ML, enterprise apps, and frontend development.

⚙️ Frameworks & Databases
Django, Flask, Next.js, React, PostgreSQL, MongoDB, Redis. Built RESTful APIs, full-stack apps, and optimized database schemas.

☁️ DevOps & Cloud
AWS, Azure, Docker, Kubernetes, Jenkins. Deployed microservices, built CI/CD pipelines, and managed cloud infrastructure.

🧠 AI/ML & APIs
Machine learning, data science, REST APIs, gRPC, GenAI. Built predictive models, high-performance APIs, and integrated AI services.`,
            
            contact: `📞 Get In Touch

Open to opportunities, collaborations, and connecting with fellow tech enthusiasts!

📧 Email: shahmoksh996@gmail.com
📱 Phone: (916) 598-6993
💼 LinkedIn: mshah-17
💻 GitHub: shmoksh
🌐 Portfolio: www.shahmoksh.me

Ready to discuss opportunities or just say hello! 👋`        };
        
        return data[sectionType] || 'I don\'t have information about that topic yet.';
    }

    // Ask question to OpenAI
    async askQuestion(question) {
        try {
            const response = await fetch(`${this.baseURL}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                data: data.response
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to get response from AI'
            };
        }
    }
} 
