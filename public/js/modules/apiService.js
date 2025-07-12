// API Service Module
export class APIService {
    constructor() {
        this.baseURL = '/api';
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
            me: `
                <h3>👨‍💻 Software Engineer at Meta</h3>
                <p>Passionate engineer specializing in scalable platforms, AI/ML, and performance optimization. Built 0→1 platforms saving 3000+ hr/yr and boosted decision speed by 40% with Agentic AI.</p>
                
                <h3>🎯 Key Impact</h3>
                <ul>
                    <li>Developed scalable platform automating workflows (3000+ hr/yr saved)</li>
                    <li>Built Agentic AI boosting decision speed by 40%</li>
                    <li>Improved API latency from 8s to 200ms</li>
                    <li>Co-built ETL framework powering 220+ pipelines (99.9% uptime)</li>
                </ul>
                
                <h3>🎓 Education</h3>
                <p><strong>MS Computer Science</strong> - California State University, Sacramento</p>
                <p><strong>BS Computer Engineering</strong> - Gujarat Technical University, India</p>
            `,
            projects: `
                <h3>🚀 Featured Projects</h3>
                <p>Showcasing technical expertise across full-stack development, ML, and data science:</p>
                
                <h4>📈 Stock Market WebApp</h4>
                <p>RESTful APIs with 8,000+ companies' stock data in DynamoDB. Real-time candlestick charts and API authentication.</p>
                
                <h4>🛡️ Network Intrusion Detection</h4>
                <p>ML models (LR, KNN, SVM, NN) for threat detection with feature engineering and correlation analysis.</p>
                
                <h4>🏠 House Price Estimation</h4>
                <p>End-to-end ML pipeline achieving 92% R² score using feature scaling, encoding, and cross-validation.</p>
            `,
            experience: `
                <h3>💼 Professional Journey</h3>
                <p>Progressive experience at leading tech companies:</p>
                
                <h4>🚀 Meta (2022-Present)</h4>
                <p>Software Engineer developing scalable platforms and AI solutions. Key achievements: 3000+ hr/yr automation, 40% faster decisions with AI, 8s→200ms API optimization.</p>
                
                <h4>⚡ Intel Corporation (2021)</h4>
                <p>Software Engineer Intern focused on automation and testing. Improved execution time by 40% and team productivity by 35%.</p>
                
                <h4>🤖 Turabit Solution (2018-2019)</h4>
                <p>Built AI chatbot reducing 80% of IT tasks. Improved integration efficiency by 40% with secure REST APIs and Stripe integration.</p>
                
                <h4>💬 ConceptServe Technologies (2018)</h4>
                <p>Developed scalable social media app with CRUD operations and OTP-based 2FA for enhanced security.</p>
            `,
            skills: `
                <h3>🛠️ Technical Expertise</h3>
                <p>Comprehensive skills across modern development stack:</p>
                
                <h4>💻 Programming Languages</h4>
                <p>Advanced: Python, Java, TypeScript, React. Intermediate: Go, Rust, Kotlin. Expertise in data science, ML, enterprise apps, and frontend development.</p>
                
                <h4>⚙️ Frameworks & Databases</h4>
                <p>Django, Flask, Next.js, React, PostgreSQL, MongoDB, Redis. Built RESTful APIs, full-stack apps, and optimized database schemas.</p>
                
                <h4>☁️ DevOps & Cloud</h4>
                <p>AWS, Azure, Docker, Kubernetes, Jenkins. Deployed microservices, built CI/CD pipelines, and managed cloud infrastructure.</p>
                
                <h4>🧠 AI/ML & APIs</h4>
                <p>Machine learning, data science, REST APIs, gRPC, GenAI. Built predictive models, high-performance APIs, and integrated AI services.</p>
            `,
            contact: `
                <h3>📞 Get In Touch</h3>
                <p>Open to opportunities, collaborations, and connecting with fellow tech enthusiasts!</p>
                
                <div style="margin-top: 1rem;">
                    <p><strong>📧 Email:</strong> <a href="mailto:shahmoksh996@gmail.com" style="color: var(--primary);">shahmoksh996@gmail.com</a></p>
                    <p><strong>📱 Phone:</strong> <a href="tel:+19165986993" style="color: var(--primary);">(916) 598-6993</a></p>
                    <p><strong>💼 LinkedIn:</strong> <a href="https://linkedin.com/in/mshah-17" target="_blank" style="color: var(--primary);">mshah-17</a></p>
                    <p><strong>💻 GitHub:</strong> <a href="https://github.com/shmoksh" target="_blank" style="color: var(--primary);">shmoksh</a></p>
                    <p><strong>🌐 Portfolio:</strong> <a href="https://www.shahmoksh.me" target="_blank" style="color: var(--primary);">www.shahmoksh.me</a></p>
                </div>
                
                <p style="margin-top: 1.5rem; font-style: italic;">Ready to discuss opportunities or just say hello! 👋</p>
            `        };
        
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
