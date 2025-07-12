// Portfolio Data Module
export const portfolioData = {
    me: {
        title: "About Me",
        content: `
            <h3>👨‍💻 Software Engineer at Meta</h3>
            <p>Passionate Software Engineer at Meta specializing in scalable platforms, AI/ML, and performance optimization. Expert in Python, Java, JavaScript, React, Go, Rust, and cloud technologies.</p>
            
            <h3>🎯 Key Achievements</h3>
            <ul>
                <li>Built 0→1 scalable platform saving 3000+ hr/yr</li>
                <li>Boosted decision speed by 40% with Agentic AI</li>
                <li>Improved API latency from 8s to 200ms</li>
                <li>Co-built ETL framework with 99.9% uptime</li>
            </ul>
            
            <h3>🎓 Education</h3>
            <p><strong>MS Computer Science</strong> - California State University, Sacramento (2020-2022)</p>
            <p><strong>BS Computer Engineering</strong> - Gujarat Technical University, India (2014-2018)</p>
        `
    },
    projects: {
        title: "Projects",
        cards: [
            {
                title: "Stock Market WebApp",
                company: "Personal Project",
                date: "Feb 2021 - Apr 2021",
                description: "RESTful APIs with 8,000+ companies' stock data in DynamoDB. Real-time candlestick charts and API authentication.",
                skills: ["REST APIs", "DynamoDB", "AWS", "JavaScript", "Data Visualization"],
                icon: "📈",
                color: "gradient-1",
                details: {
                    overview: "A comprehensive stock market analysis platform with real-time data visualization",
                    technologies: ["Node.js", "Express.js", "AWS DynamoDB", "Chart.js", "HTML/CSS", "JavaScript"],
                    features: [
                        "Real-time stock data from 8,000+ companies",
                        "Interactive candlestick charts and technical indicators",
                        "API key authentication and rate limiting",
                        "Responsive web interface",
                        "Historical data analysis"
                    ],
                    challenges: [
                        "Handling large datasets efficiently",
                        "Implementing real-time data updates",
                        "Managing API rate limits",
                        "Creating responsive chart visualizations"
                    ],
                    outcomes: [
                        "Successfully processed 8,000+ company datasets",
                        "Achieved sub-second response times",
                        "Implemented secure API authentication",
                        "Created intuitive user interface"
                    ]
                }
            },
            {
                title: "Network Intrusion Detection",
                company: "Academic Project",
                date: "Oct 2020 - Nov 2020",
                description: "ML models (LR, KNN, SVM, NN) for network intrusion detection. Feature engineering and correlation analysis for high accuracy threat detection.",
                skills: ["Machine Learning", "Python", "Classification", "Data Analysis", "Scikit-learn"],
                icon: "🛡️",
                color: "gradient-2",
                details: {
                    overview: "Machine learning-based network security system for detecting malicious network activities",
                    technologies: ["Python", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Jupyter Notebook"],
                    features: [
                        "Multiple ML algorithms (Logistic Regression, KNN, SVM, Neural Networks)",
                        "Feature engineering and correlation analysis",
                        "Binary classification for intrusion detection",
                        "Model performance evaluation and comparison",
                        "Data preprocessing and normalization"
                    ],
                    challenges: [
                        "Handling imbalanced datasets",
                        "Feature selection and engineering",
                        "Model optimization and hyperparameter tuning",
                        "Ensuring high detection accuracy"
                    ],
                    outcomes: [
                        "Achieved high accuracy in threat detection",
                        "Successfully compared multiple ML algorithms",
                        "Implemented robust feature engineering pipeline",
                        "Created comprehensive model evaluation framework"
                    ]
                }
            },
            {
                title: "House Price Estimation",
                company: "Academic Project",
                date: "Sep 2020 - Oct 2020",
                description: "End-to-end ML pipeline for housing price forecasting. Achieved 92% R² score using feature scaling, encoding, and cross-validation.",
                skills: ["Regression", "Python", "Data Science", "Cross-validation", "Feature Engineering"],
                icon: "🏠",
                color: "gradient-3",
                details: {
                    overview: "End-to-end machine learning pipeline for real estate price prediction",
                    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
                    features: [
                        "Multiple regression algorithms",
                        "Feature scaling and normalization",
                        "One-hot encoding for categorical variables",
                        "Cross-validation techniques",
                        "Model performance metrics (R², RMSE, MAE)"
                    ],
                    challenges: [
                        "Handling missing data and outliers",
                        "Feature selection and engineering",
                        "Model overfitting prevention",
                        "Achieving high prediction accuracy"
                    ],
                    outcomes: [
                        "Achieved 92% R² score",
                        "Implemented robust data preprocessing pipeline",
                        "Created comprehensive model evaluation framework",
                        "Successfully deployed end-to-end ML solution"
                    ]
                }
            }
        ]
    },
    experience: {
        title: "Work Experience",
        cards: [
            {
                title: "Software Engineer",
                company: "Meta",
                date: "Jun 2022 - Present",
                description: "Developed 0→1 scalable platform saving 3000+ hr/yr. Built Agentic AI boosting decision speed by 40%. Led query optimization improving API latency from 8s to 200ms.",
                skills: ["Scalable Platforms", "AI/ML", "Performance Optimization", "ETL", "Data Analytics"],
                icon: "🚀",
                color: "gradient-4",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png",
                details: {
                    overview: "Leading development of scalable platforms and AI solutions at Meta",
                    responsibilities: [
                        "Developed 0→1 scalable platform automating cross-functional workflows",
                        "Built Agentic AI system for self-serve analytics and data visualization",
                        "Led organization-wide query optimization and performance improvements",
                        "Co-built custom ETL framework for data pipeline management",
                        "Implemented automatic SEV detection and monitoring systems"
                    ],
                    achievements: [
                        "Saved 3000+ hours annually through workflow automation",
                        "Boosted decision speed by 40% with AI-powered analytics",
                        "Improved API latency from 8 seconds to 200ms",
                        "Built 220+ data pipelines with 99.9% uptime",
                        "Enhanced product reliability and reduced downtime"
                    ],
                    technologies: ["Python", "Java", "React", "Go", "Rust", "AWS", "Kubernetes", "Docker", "Airflow", "GraphQL", "REST APIs"]
                }
            },
            {
                title: "Software Engineer Intern",
                company: "Intel Corporation",
                date: "Feb 2021 - Dec 2021",
                description: "Multi-processing application for software testing improving execution time by 40%. Restructured failure management logging systems. Automated CI/CD pipeline increasing productivity by 35%.",
                skills: ["Multi-processing", "APIs", "CI/CD", "Automation", "Testing"],
                icon: "⚡",
                color: "gradient-5",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282020%2C_light_blue%29.svg/1200px-Intel_logo_%282020%2C_light_blue%29.svg.png",
                details: {
                    overview: "Developed automation solutions and testing frameworks at Intel",
                    responsibilities: [
                        "Built multi-processing applications for software testing automation",
                        "Restructured failure management and logging systems",
                        "Automated CI/CD pipeline for regression testing",
                        "Collaborated with cross-functional teams for system integration",
                        "Developed testing scripts and failure capture mechanisms"
                    ],
                    achievements: [
                        "Improved test execution time by 40%",
                        "Increased team productivity by 35%",
                        "Enhanced system reliability and error detection",
                        "Streamlined deployment processes"
                    ],
                    technologies: ["Python", "Java", "Jenkins", "Docker", "REST APIs", "Linux", "Shell Scripting"]
                }
            },
            {
                title: "Software Engineer",
                company: "Turabit Solution Pvt. Ltd.",
                date: "Jul 2018 - Apr 2019",
                description: "Built conversational AI chatbot reducing 80% of mundane IT tasks. Improved integration efficiency by 40% with secure REST APIs. Integrated Stripe payment gateway for customizable chatbot service.",
                skills: ["AI Chatbot", "REST APIs", "Stripe", "Database Design", "Security"],
                icon: "🤖",
                color: "gradient-6",
                details: {
                    overview: "Developed AI-powered chatbot solutions for IT service automation",
                    responsibilities: [
                        "Built conversational AI chatbot for IT service automation",
                        "Developed secure REST APIs for cross-platform integration",
                        "Integrated Stripe payment gateway for subscription services",
                        "Designed and optimized database architecture",
                        "Implemented backup and recovery systems"
                    ],
                    achievements: [
                        "Reduced mundane IT tasks by 80%",
                        "Improved integration efficiency by 40%",
                        "Successfully integrated payment processing",
                        "Enhanced system security and reliability"
                    ],
                    technologies: ["Python", "JavaScript", "Node.js", "MongoDB", "Stripe API", "REST APIs", "Docker"]
                }
            },
            {
                title: "Software Engineer Intern",
                company: "ConceptServe Technologies",
                date: "Jan 2018 - Jul 2018",
                description: "Built scalable MVC-based social media app with CRUD operations. Implemented OTP-based 2FA with email verification for enhanced account security.",
                skills: ["MVC", "Social Media App", "CRUD", "2FA", "Email Verification"],
                icon: "💬",
                color: "gradient-7",
                details: {
                    overview: "Developed social media application with security features",
                    responsibilities: [
                        "Built scalable MVC-based social media application",
                        "Implemented CRUD operations for posts, comments, and groups",
                        "Developed OTP-based two-factor authentication",
                        "Integrated email verification system",
                        "Designed user interface and user experience"
                    ],
                    achievements: [
                        "Successfully delivered feature-rich social media platform",
                        "Implemented robust security measures",
                        "Enhanced user account protection",
                        "Accelerated feature delivery timeline"
                    ],
                    technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "Bootstrap", "SMTP"]
                }
            }
        ]
    },
    skills: {
        title: "Technical Skills",
        cards: [
            {
                title: "Programming Languages",
                company: "Core Technologies",
                description: "Advanced proficiency in Python, Java, TypeScript, React. Intermediate skills in Go, Rust, Kotlin. Expertise spans data science, ML, enterprise applications, and frontend development.",
                skills: ["Python", "Java", "Go", "TypeScript", "React", "GraphQL", "Rust", "Kotlin", "Node.js"],
                icon: "💻",
                color: "gradient-8",
                details: {
                    overview: "Proficient in modern programming languages and frameworks",
                    expertise: {
                        "Python": "Advanced - Data Science, ML, Backend Development",
                        "Java": "Advanced - Enterprise Applications, Spring Boot",
                        "Go": "Intermediate - Microservices, Cloud Native",
                        "TypeScript": "Advanced - Frontend Development, React",
                        "Rust": "Intermediate - Systems Programming, Performance",
                        "Kotlin": "Intermediate - Android Development, Backend"
                    },
                    projects: [
                        "Built ML models and data pipelines with Python",
                        "Developed enterprise applications with Java/Spring",
                        "Created microservices with Go",
                        "Built responsive web applications with TypeScript/React"
                    ]
                }
            },
            {
                title: "Frameworks & Databases",
                company: "Development Stack",
                description: "Expertise in Django, Flask, Next.js, React, PostgreSQL, MongoDB, Redis. Built RESTful APIs, full-stack applications, and optimized database schemas.",
                skills: ["Django", "Flask", "Next.js", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "EntQL"],
                icon: "⚙️",
                color: "gradient-9",
                details: {
                    overview: "Comprehensive knowledge of modern development frameworks and databases",
                    expertise: {
                        "Web Frameworks": "Django, Flask, Next.js, Express.js",
                        "Frontend": "React, TypeScript, Tailwind CSS, Bootstrap",
                        "Databases": "PostgreSQL, MongoDB, Redis, MySQL",
                        "ORM/Query": "SQLAlchemy, EntQL, Prisma, Mongoose"
                    },
                    experience: [
                        "Built RESTful APIs with Django and Flask",
                        "Developed full-stack applications with Next.js",
                        "Designed and optimized database schemas",
                        "Implemented caching strategies with Redis"
                    ]
                }
            },
            {
                title: "DevOps & Cloud",
                company: "Infrastructure",
                description: "Proficient in AWS, Azure, Docker, Kubernetes, Jenkins. Deployed microservices, built CI/CD pipelines, and managed cloud infrastructure with monitoring solutions.",
                skills: ["Git", "Docker", "Kubernetes", "Jenkins", "Azure", "AWS", "EC2", "S3", "Lambda", "ElasticSearch"],
                icon: "☁️",
                color: "gradient-10",
                details: {
                    overview: "Expertise in cloud infrastructure and DevOps practices",
                    expertise: {
                        "Cloud Platforms": "AWS, Azure, Google Cloud",
                        "Containerization": "Docker, Kubernetes, Helm",
                        "CI/CD": "Jenkins, GitHub Actions, GitLab CI",
                        "Monitoring": "Prometheus, Grafana, ELK Stack"
                    },
                    experience: [
                        "Deployed microservices on Kubernetes clusters",
                        "Built automated CI/CD pipelines",
                        "Managed cloud infrastructure and resources",
                        "Implemented monitoring and logging solutions"
                    ]
                }
            },
            {
                title: "AI/ML & APIs",
                company: "Advanced Technologies",
                description: "Specialized in machine learning, data science, REST APIs, gRPC, GenAI. Built predictive models, high-performance APIs, and integrated AI services.",
                skills: ["gRPC", "REST API", "Linux", "GenAI", "Machine Learning", "Data Science"],
                icon: "🧠",
                color: "gradient-11",
                details: {
                    overview: "Specialized in AI/ML and modern API development",
                    expertise: {
                        "Machine Learning": "Scikit-learn, TensorFlow, PyTorch",
                        "API Development": "REST APIs, gRPC, GraphQL",
                        "Data Science": "Pandas, NumPy, Matplotlib, Seaborn",
                        "AI/GenAI": "OpenAI API, LangChain, Vector Databases"
                    },
                    experience: [
                        "Built ML models for predictive analytics",
                        "Developed high-performance APIs with gRPC",
                        "Created data visualization and analysis tools",
                        "Integrated AI services and chatbots"
                    ]
                }
            }
        ]
    },
    contact: {
        title: "Contact Information",
        content: `
            <div class="contact-info">
                <a href="mailto:shahmoksh996@gmail.com" class="contact-item">
                    <span class="material-icons">mail</span>
                    <span>shahmoksh996@gmail.com</span>
                </a>
                <a href="tel:+19165986993" class="contact-item">
                    <span class="material-icons">phone</span>
                    <span>(916) 598-6993</span>
                </a>
                <a href="https://linkedin.com/in/mshah-17" class="contact-item" target="_blank">
                    <span class="material-icons">link</span>
                    <span>LinkedIn: mshah-17</span>
                </a>
                <a href="https://github.com/shmoksh" class="contact-item" target="_blank">
                    <span class="material-icons">code</span>
                    <span>GitHub: shmoksh</span>
                </a>
                <a href="https://www.shahmoksh.me" class="contact-item" target="_blank">
                    <span class="material-icons">language</span>
                    <span>Portfolio: www.shahmoksh.me</span>
                </a>
            </div>
        `
    }
}; 