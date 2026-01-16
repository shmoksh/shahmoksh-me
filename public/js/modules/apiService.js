// API Service Module
export class APIService {
    constructor() {
        this.baseURL = '/api';
        this.mokshTopics = {
            personal: ['moksh', 'shah', 'me', 'about', 'who', 'background', 'bio'],
            companies: ['meta', 'facebook', 'intel', 'conceptserve', 'turabit'],
            roles: ['software engineer', 'engineer', 'intern', 'developer'],
            education: ['california state university', 'sacramento', 'gujarat', 'ms', 'bs', 'education', 'degree'],
            skills: ['python', 'java', 'javascript', 'react', 'go', 'rust', 'typescript', 'kotlin', 'django', 'flask', 'aws', 'docker', 'kubernetes', 'machine learning', 'ai', 'ml', 'api', 'rest', 'graphql'],
            projects: ['project', 'stock market', 'intrusion', 'house price', 'estimation', 'url shorty', 'esignature'],
            achievements: ['3000', '40%', '200ms', 'automation', 'ai', 'performance', 'optimization', 'pipeline'],
            contact: ['email', 'phone', 'linkedin', 'github', 'contact', 'reach', 'connect'],
            experience: ['experience', 'job', 'work', 'career', 'employment']
        };
    }

    isMokshRelated(query) {
        const lowerQuery = query.toLowerCase();
        return Object.values(this.mokshTopics)
            .flat()
            .some(keyword => lowerQuery.includes(keyword));
    }

    getIntroMessage() {
        return `Hi, I am Moksh's AI portfolio assistant. Ask me about experience, projects, skills, or impact. You can also tap a prompt to get started.`;
    }

    getFallbackReply() {
        return `I can only answer questions about Moksh's background, experience, and expertise. Try asking about work at Meta, recent projects, skills, or how to get in touch.`;
    }

    shouldUsePredefinedResponse(query) {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone')) {
            return 'contact';
        }
        if (lowerQuery.includes('experience') || lowerQuery.includes('job') || lowerQuery.includes('career') || lowerQuery.includes('meta') || lowerQuery.includes('intel')) {
            return 'experience';
        }
        if (lowerQuery.includes('project') || lowerQuery.includes('build') || lowerQuery.includes('portfolio')) {
            return 'projects';
        }
        if (lowerQuery.includes('ai') || lowerQuery.includes('ml') || lowerQuery.includes('machine learning') || lowerQuery.includes('genai')) {
            return 'ai';
        }
        if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
            return 'skills';
        }
        if (lowerQuery.includes('me') || lowerQuery.includes('about') || lowerQuery.includes('who')) {
            return 'me';
        }

        return null;
    }

    getPredefinedResponse(sectionType) {
        const data = {
            me: `Moksh Shah is a Software Engineer at Meta focused on scalable platforms, AI/ML, and performance optimization.

Highlights:
- Built a 0-to-1 automation platform saving 3000+ hours per year
- Shipped agentic AI for self-serve analytics, improving decision speed by 40%
- Cut API latency from 8s to 200ms through org-wide optimization
- Co-built an ETL framework supporting 220+ pipelines at 99.9% uptime

Education:
- MS Computer Science, California State University, Sacramento
- BS Computer Engineering, Gujarat Technical University`,

            projects: `Selected projects that show range and depth:

- Stock Market WebApp: REST APIs with 8,000+ companies' data, real-time candlestick charts, DynamoDB storage.
- Network Intrusion Detection: ML models (LR, KNN, SVM, NN) for threat detection with feature engineering.
- House Price Estimation: End-to-end ML pipeline reaching 92% R2 using scaling, encoding, and cross-validation.
- eSignature Management: Signature detection, noise removal, and drawing UX for CalPERS sponsor.
- URL Shorty: Customizable URL shortener on AWS EC2 with expiration and editing controls.`,

            experience: `Experience overview:

- Meta (2022-Present): Scalable platforms and AI solutions. Automated workflows saving 3000+ hours per year and improved API latency from 8s to 200ms.
- Intel (2021): Built automation tools for testing, improving execution time by 40% and team productivity by 35%.
- Turabit Solution (2018-2019): Built AI chatbot cutting 80% of IT tasks; improved integration efficiency by 40%.
- ConceptServe (2018): MVC web app with CRUD and OTP-based 2FA for stronger security.`,

            skills: `Core technical strengths:

- Languages: Python, Java, TypeScript, Go, Rust, Kotlin
- Frameworks: Django, Flask, React, Next.js
- Data + APIs: PostgreSQL, MongoDB, Redis, REST, gRPC, GraphQL
- Cloud + DevOps: AWS, Docker, Kubernetes, Jenkins
- AI/ML: machine learning, data science, GenAI integrations`,

            contact: `Contact details:

- Email: shahmoksh996@gmail.com
- Phone: (916) 598-6993
- LinkedIn: mshah-17
- GitHub: shmoksh
- Portfolio: www.shahmoksh.me`
            ,
            ai: `AI/ML focus and impact:

- Built agentic AI for self-serve analytics, turning natural language into data insights and boosting decision speed by 40%.
- Applied ML for automation and prediction across platforms, with a focus on reliability, latency, and explainability.
- Tooling: Python, data science stack, REST/gRPC APIs, and modern GenAI integrations.

If you want specifics, ask about a project, model type, or system design choice.`
        };

        return data[sectionType] || 'I do not have information about that topic yet.';
    }

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
