// Dynamic Response Renderer Module
export class ResponseRenderer {
    constructor() {
        this.contextKeywords = {
            me: ['me', 'about', 'who', 'introduce', 'background', 'myself'],
            projects: ['project', 'work', 'build', 'create', 'develop', 'app', 'application'],
            experience: ['experience', 'job', 'work', 'career', 'employment', 'meta', 'intel', 'company'],
            skills: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool'],
            contact: ['contact', 'email', 'phone', 'reach', 'connect', 'linkedin', 'github']
        };
    }

    // Detect context from query
    detectContext(query) {
        const lowerQuery = query.toLowerCase();
        
        for (const [context, keywords] of Object.entries(this.contextKeywords)) {
            if (keywords.some(keyword => lowerQuery.includes(keyword))) {
                return context;
            }
        }
        
        return 'default';
    }

    // Render response based on context
    renderResponse(content, context) {
        switch (context) {
            case 'me':
                return this.renderMeLayout(content);
            case 'projects':
                return this.renderProjectsLayout(content);
            case 'experience':
                return this.renderExperienceLayout(content);
            case 'skills':
                return this.renderSkillsLayout(content);
            case 'contact':
                return this.renderContactLayout(content);
            default:
                return this.renderDefaultLayout(content);
        }
    }

    // Me/About layout - centered intro style
    renderMeLayout(content) {
        return `
            <div class="response-layout-me">
                <div class="me-intro">
                    <div class="me-avatar">👨‍💻</div>
                    <div class="me-content">
                        ${this.parseContent(content)}
                    </div>
                </div>
            </div>
        `;
    }

    // Projects layout - responsive grid of cards
    renderProjectsLayout(content) {
        return `
            <div class="response-layout-projects">
                <div class="projects-header">
                    <h3>🚀 Featured Projects</h3>
                    <p>Showcasing technical expertise across full-stack development, ML, and data science</p>
                </div>
                <div class="projects-grid">
                    ${this.renderProjectCards()}
                </div>
            </div>
        `;
    }

    // Experience layout - vertical timeline
    renderExperienceLayout(content) {
        return `
            <div class="response-layout-experience">
                <div class="experience-header">
                    <h3>💼 Professional Journey</h3>
                    <p>Progressive experience at leading tech companies</p>
                </div>
                <div class="experience-timeline">
                    ${this.renderExperienceTimeline()}
                </div>
            </div>
        `;
    }

    // Skills layout - categorized badges
    renderSkillsLayout(content) {
        return `
            <div class="response-layout-skills">
                <div class="skills-header">
                    <h3>🛠️ Technical Expertise</h3>
                    <p>Comprehensive skills across modern development stack</p>
                </div>
                <div class="skills-categories">
                    ${this.renderSkillsCategories()}
                </div>
            </div>
        `;
    }

    // Contact layout - clean contact info
    renderContactLayout(content) {
        return `
            <div class="response-layout-contact">
                <div class="contact-header">
                    <h3>📞 Get In Touch</h3>
                    <p>Open to opportunities, collaborations, and connecting with fellow tech enthusiasts!</p>
                </div>
                <div class="contact-info-grid">
                    ${this.renderContactInfo()}
                </div>
            </div>
        `;
    }

    // Default layout - simple chat message
    renderDefaultLayout(content) {
        return `
            <div class="response-layout-default">
                <div class="chat-message">
                    ${this.parseContent(content)}
                </div>
            </div>
        `;
    }

    // Parse content and convert markdown-like syntax
    parseContent(content) {
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```(.*?)```/g, '<code class="code-block">$1</code>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    }

    // Render project cards from portfolio data
    renderProjectCards() {
        const projects = [
            {
                title: "Stock Market WebApp",
                description: "RESTful APIs with 8,000+ companies' stock data in DynamoDB. Real-time candlestick charts and API authentication.",
                tech: ["REST APIs", "DynamoDB", "AWS", "JavaScript", "Data Visualization"],
                icon: "📈"
            },
            {
                title: "Network Intrusion Detection",
                description: "ML models (LR, KNN, SVM, NN) for threat detection with feature engineering and correlation analysis.",
                tech: ["Machine Learning", "Python", "Classification", "Data Analysis", "Scikit-learn"],
                icon: "🛡️"
            },
            {
                title: "House Price Estimation",
                description: "End-to-end ML pipeline achieving 92% R² score using feature scaling, encoding, and cross-validation.",
                tech: ["Regression", "Python", "Data Science", "Cross-validation", "Feature Engineering"],
                icon: "🏠"
            },
            {
                title: "eSignature Management Application, CalPERS (Project Sponsor)",
                description: "Implemented background noise removal and canny edge detection algorithms for signature detection. Created signature drawing feature with crop/save functionality up to 300pi*300pi. Built user page for default signature selection.",
                tech: ["Python", "OpenCV", "Image Processing", "JavaScript", "UX/UI"],
                icon: "✍️"
            },
            {
                title: "URL Shorty",
                description: "Designed web-based URL shortener deployed on AWS EC2. Implemented customizable link editing and user-defined expiration periods.",
                tech: ["AWS EC2", "Node.js", "Express.js", "MongoDB", "JavaScript", "Web Security"],
                icon: "🔗"
            }
        ];

        return projects.map(project => `
            <div class="project-card">
                <div class="project-icon">${project.icon}</div>
                <div class="project-content">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render experience timeline
    renderExperienceTimeline() {
        const experiences = [
            {
                company: "Meta",
                role: "Software Engineer",
                duration: "2022-Present",
                description: "Developing scalable platforms and AI solutions. Key achievements: 3000+ hr/yr automation, 40% faster decisions with AI, 8s→200ms API optimization.",
                icon: "🚀"
            },
            {
                company: "Intel Corporation",
                role: "Software Engineer Intern",
                duration: "2021",
                description: "Focused on automation and testing. Improved execution time by 40% and team productivity by 35%.",
                icon: "⚡"
            },
            {
                company: "Turabit Solution",
                role: "Software Engineer",
                duration: "2018-2019",
                description: "Built AI chatbot reducing 80% of IT tasks. Improved integration efficiency by 40% with secure REST APIs and Stripe integration.",
                icon: "🤖"
            },
            {
                company: "ConceptServe Technologies",
                role: "Software Engineer – Intern",
                duration: "Jan 2018 – Jul 2018",
                description: "Implemented MVC architecture for social media web app with CRUD operations. Developed 2FA using OTP and email for enhanced security. Added 20% more test cases and improved debugging.",
                icon: "💬"
            }
        ];

        return experiences.map(exp => `
            <div class="experience-item">
                <div class="experience-icon">${exp.icon}</div>
                <div class="experience-content">
                    <div class="experience-header">
                        <h4>${exp.company}</h4>
                        <span class="experience-role">${exp.role}</span>
                        <span class="experience-duration">${exp.duration}</span>
                    </div>
                    <p>${exp.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Render skills categories
    renderSkillsCategories() {
        const skillCategories = [
            {
                title: "Programming Languages",
                skills: ["Python", "Java", "Go", "TypeScript", "React", "GraphQL", "Rust", "Kotlin", "Node.js"],
                icon: "💻"
            },
            {
                title: "Frameworks & Databases",
                skills: ["Django", "Flask", "Next.js", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "EntQL"],
                icon: "⚙️"
            },
            {
                title: "DevOps & Cloud",
                skills: ["Git", "Docker", "Kubernetes", "Jenkins", "Azure", "AWS", "EC2", "S3", "Lambda", "ElasticSearch"],
                icon: "☁️"
            },
            {
                title: "AI/ML & APIs",
                skills: ["gRPC", "REST API", "Linux", "GenAI", "Machine Learning", "Data Science"],
                icon: "🧠"
            }
        ];

        return skillCategories.map(category => `
            <div class="skill-category">
                <div class="category-header">
                    <span class="category-icon">${category.icon}</span>
                    <h4>${category.title}</h4>
                </div>
                <div class="skill-badges">
                    ${category.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Render contact information
    renderContactInfo() {
        const contacts = [
            { type: "Email", value: "shahmoksh996@gmail.com", icon: "📧", link: "mailto:shahmoksh996@gmail.com" },
            { type: "Phone", value: "(916) 598-6993", icon: "📱", link: "tel:+19165986993" },
            { type: "LinkedIn", value: "mshah-17", icon: "💼", link: "https://linkedin.com/in/mshah-17" },
            { type: "GitHub", value: "shmoksh", icon: "💻", link: "https://github.com/shmoksh" },
            { type: "Portfolio", value: "www.shahmoksh.me", icon: "🌐", link: "https://www.shahmoksh.me" }
        ];

        return contacts.map(contact => `
            <div class="contact-item">
                <a href="${contact.link}" target="_blank" class="contact-link">
                    <span class="contact-icon">${contact.icon}</span>
                    <div class="contact-details">
                        <span class="contact-type">${contact.type}</span>
                        <span class="contact-value">${contact.value}</span>
                    </div>
                </a>
            </div>
        `).join('');
    }
} 