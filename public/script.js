// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const responseSection = document.getElementById('response-section');
const responseContainer = document.getElementById('response-container');
const typingIndicator = document.getElementById('typing-indicator');
const actionButtons = document.querySelectorAll('.action-btn');
const mainContent = document.querySelector('.main-content');

// State
let isTyping = false;
let currentResponse = '';

// Predefined responses to avoid API calls
const predefinedResponses = {
    'me': `Hi! I'm Moksh Shah, a Software Engineer at Meta with a passion for building scalable platforms and AI solutions. I specialize in developing 0→1 products that automate workflows and boost productivity. With experience at Intel, Turabit Solutions, and ConceptServe Technologies, I've worked on everything from conversational AI chatbots to multi-processing applications. I love solving complex problems and creating impactful solutions that make a difference.`,
    
    'projects': `Here are some of my key projects that showcase my technical skills and problem-solving abilities:`,
    
    'skills': `I've developed a diverse skill set across multiple technologies and domains:`,
    
    'experience': `Here's my professional journey and the impact I've made at each role:`,
    
    'contact': `I'd love to connect! Here are the best ways to reach me:`
};

// Valid search topics for error handling
const validTopics = [
    'moksh', 'shah', 'meta', 'intel', 'software engineer', 'projects', 'skills', 
    'experience', 'contact', 'resume', 'github', 'linkedin', 'email', 'phone',
    'python', 'java', 'javascript', 'react', 'aws', 'docker', 'kubernetes',
    'machine learning', 'ai', 'ml', 'etl', 'api', 'database', 'cloud',
    'stock market', 'network security', 'house price', 'chatbot', 'social media',
    'california', 'ahmedabad', 'india', 'university', 'education', 'background'
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AI Portfolio Website loaded!');
    
    // Focus on input when page loads
    searchInput.focus();
    
    // Add event listeners
    setupEventListeners();
    
    // Add initial animation
    animateOnLoad();
});

// Setup all event listeners
function setupEventListeners() {
    // Search form submission
    searchForm.addEventListener('submit', handleSearch);
    
    // Input events for better UX
    searchInput.addEventListener('input', handleInputChange);
    searchInput.addEventListener('keydown', handleKeyDown);
    
    // Action button clicks
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionButton);
    });
}

// Handle search form submission
async function handleSearch(e) {
    e.preventDefault();
    
    const query = searchInput.value.trim();
    if (!query) return;
    
    // Check if it's a predefined button query
    const predefinedResponse = getPredefinedResponse(query);
    if (predefinedResponse) {
        displayResponse(predefinedResponse);
        searchInput.value = '';
        return;
    }
    
    // Handle custom queries
    if (query.toLowerCase().includes('moksh') || 
        query.toLowerCase().includes('shah') || 
        query.toLowerCase().includes('portfolio') ||
        query.toLowerCase().includes('about') ||
        query.toLowerCase().includes('who') ||
        query.toLowerCase().includes('what') ||
        query.toLowerCase().includes('tell') ||
        query.toLowerCase().includes('experience') ||
        query.toLowerCase().includes('project') ||
        query.toLowerCase().includes('skill') ||
        query.toLowerCase().includes('contact') ||
        query.toLowerCase().includes('resume') ||
        query.toLowerCase().includes('github') ||
        query.toLowerCase().includes('linkedin')) {
        
        await sendToAI(query);
    } else {
        displayError('Please ask something about Moksh Shah, his experience, projects, skills, or contact information.');
    }
    
    searchInput.value = '';
}

// Handle action button clicks
async function handleActionButton(e) {
    const button = e.currentTarget;
    const buttonText = button.querySelector('span:not(.material-icons)').textContent.toLowerCase();
    
    let query = '';
    switch(buttonText) {
        case 'me':
            query = 'about me';
            break;
        case 'projects':
            query = 'projects';
            break;
        case 'skills':
            query = 'skills';
            break;
        case 'experience':
            query = 'experience';
            break;
        case 'contact':
            query = 'contact';
            break;
    }
    
    if (query) {
        searchInput.value = query;
        handleSearch(new Event('submit'));
    }
}

// Check if search is within valid topics
function isValidSearch(query) {
    const lowerQuery = query.toLowerCase();
    return validTopics.some(topic => lowerQuery.includes(topic));
}

// Process a question and get AI response
async function processQuestion(question, buttonType = null) {
    // Show loading state
    setLoadingState(true);
    
    try {
        let response;
        
        // Use predefined responses for button clicks
        if (buttonType) {
            const responseKey = buttonType.replace('-btn', '');
            response = predefinedResponses[responseKey] || 'I can help you with that!';
        } else {
            // Check if search is within valid topics
            if (!isValidSearch(question)) {
                throw new Error('OUT_OF_CONTENT');
            }
            
            // Send message to backend for custom questions
            response = await sendMessageToAI(question);
        }
        
        // Display the response based on button type
        if (buttonType) {
            await displaySpecializedResponse(response, buttonType);
        } else {
            await displayResponse(response);
        }
        
        // Move search bar below response
        moveSearchBarBelow();
        
    } catch (error) {
        console.error('Error:', error);
        if (error.message === 'OUT_OF_CONTENT') {
            showError('Sorry, I can only answer questions about Moksh Shah, his background, skills, experience, projects, and contact information. Please ask me something related to these topics.');
        } else {
            showError('Sorry, I encountered an error. Please try again.');
        }
    } finally {
        setLoadingState(false);
    }
}

// Send message to AI via backend (only for custom questions)
async function sendMessageToAI(message) {
    const response = await fetch('/.netlify/functions/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
}

// Display AI response with typing effect
async function displayResponse(text) {
    // Show response section
    responseSection.style.display = 'block';
    
    // Show typing indicator
    typingIndicator.style.display = 'flex';
    responseContainer.innerHTML = '';
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Hide typing indicator
    typingIndicator.style.display = 'none';
    
    // Type out the response with smooth animation
    await typeWriter(responseContainer, text);
}

// Display specialized response based on button type
async function displaySpecializedResponse(text, buttonType) {
    // Show response section
    responseSection.style.display = 'block';
    
    // Show typing indicator
    typingIndicator.style.display = 'flex';
    responseContainer.innerHTML = '';
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Hide typing indicator
    typingIndicator.style.display = 'none';
    
    // Create specialized content based on button type
    let content = '';
    
    switch (buttonType) {
        case 'projects-btn':
            content = createProjectsCards();
            break;
        case 'skills-btn':
            content = createSkillsCards();
            break;
        case 'experience-btn':
            content = createExperienceCards();
            break;
        case 'contact-btn':
            content = createContactCards();
            break;
        default:
            await typeWriter(responseContainer, text);
            return;
    }
    
    // Display the specialized content with fade-in effect
    responseContainer.innerHTML = content;
    responseContainer.style.opacity = '0';
    responseContainer.style.transform = 'translateY(20px)';
    
    // Animate the content in
    setTimeout(() => {
        responseContainer.style.transition = 'all 0.6s ease-out';
        responseContainer.style.opacity = '1';
        responseContainer.style.transform = 'translateY(0)';
    }, 100);
}

// Create projects cards
function createProjectsCards() {
    return `
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-thumbnail">
                    <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop" alt="Stock Market App">
                    <span class="material-icons">trending_up</span>
                </div>
                <div class="project-content">
                    <h3>Stock Market WebApp</h3>
                    <p>RESTful APIs with 8,000+ companies' stock data, real-time interactive candlestick charts, and secure API authentication.</p>
                    <div class="project-tech">
                        <span class="tech-tag">DynamoDB</span>
                        <span class="tech-tag">REST API</span>
                        <span class="tech-tag">AWS</span>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-thumbnail">
                    <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop" alt="Network Security">
                    <span class="material-icons">security</span>
                </div>
                <div class="project-content">
                    <h3>Network Intrusion Detection</h3>
                    <p>Predictive binary classification models (LR, KNN, SVM, NN) to distinguish between good and bad connections.</p>
                    <div class="project-tech">
                        <span class="tech-tag">Machine Learning</span>
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">Classification</span>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-thumbnail">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop" alt="House Price">
                    <span class="material-icons">home</span>
                </div>
                <div class="project-content">
                    <h3>House Price Estimation</h3>
                    <p>End-to-end predictive model forecasting housing prices with 92% R² score using feature scaling and cross-validation.</p>
                    <div class="project-tech">
                        <span class="tech-tag">ML</span>
                        <span class="tech-tag">Regression</span>
                        <span class="tech-tag">Python</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create experience cards
function createExperienceCards() {
    return `
        <div class="experience-grid">
            <div class="experience-card">
                <div class="experience-header">
                    <div class="company-logo">
                        <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop" alt="Meta">
                        <span class="material-icons">business</span>
                    </div>
                    <div class="company-info">
                        <h3>Meta</h3>
                        <p class="position">Software Engineer</p>
                        <p class="duration">June 2022 – Present</p>
                        <p class="location">California, United States</p>
                    </div>
                </div>
                <div class="experience-content">
                    <ul class="achievements">
                        <li>Developed 0→1 scalable platform, automating workflows and saving 3000+ hr/yr</li>
                        <li>Boosted decision speed by 40% with Agentic AI for self-serve analytics</li>
                        <li>Led org-wide query optimization, cutting fatal errors and improved API latency by 8s to 200ms</li>
                        <li>Co-built custom ETL framework powering 220+ pipelines with 99.9% uptime</li>
                    </ul>
                    <div class="experience-tech">
                        <span class="tech-tag">Scalable Platforms</span>
                        <span class="tech-tag">AI/ML</span>
                        <span class="tech-tag">ETL</span>
                        <span class="tech-tag">Performance</span>
                    </div>
                </div>
            </div>
            
            <div class="experience-card">
                <div class="experience-header">
                    <div class="company-logo">
                        <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=80&h=80&fit=crop" alt="Intel">
                        <span class="material-icons">memory</span>
                    </div>
                    <div class="company-info">
                        <h3>Intel Corporation</h3>
                        <p class="position">Software Engineer Intern</p>
                        <p class="duration">February 2021 – Dec 2021</p>
                        <p class="location">California, United States</p>
                    </div>
                </div>
                <div class="experience-content">
                    <ul class="achievements">
                        <li>Devised multi-processing application improving execution time by 40%</li>
                        <li>Coordinated team to restructure failure management logging systems</li>
                        <li>Worked with XFN teams to provide automation framework for testing scripts</li>
                        <li>Improved CI/CD pipeline increasing productivity by 35%</li>
                    </ul>
                    <div class="experience-tech">
                        <span class="tech-tag">Multi-processing</span>
                        <span class="tech-tag">CI/CD</span>
                        <span class="tech-tag">Automation</span>
                        <span class="tech-tag">Testing</span>
                    </div>
                </div>
            </div>
            
            <div class="experience-card">
                <div class="experience-header">
                    <div class="company-logo">
                        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop" alt="Turabit">
                        <span class="material-icons">smart_toy</span>
                    </div>
                    <div class="company-info">
                        <h3>Turabit Solution Pvt. Ltd.</h3>
                        <p class="position">Software Engineer</p>
                        <p class="duration">July 2018 – April 2019</p>
                        <p class="location">Ahmedabad, India</p>
                    </div>
                </div>
                <div class="experience-content">
                    <ul class="achievements">
                        <li>Built conversational AI chatbot reducing mundane tasks by 80%</li>
                        <li>Improved integration efficiency by 40% supporting secure REST APIs</li>
                        <li>Integrated "pay as you go" service using Stripe payment gateway</li>
                        <li>Redesigned database architecture including backup/recovery and security</li>
                    </ul>
                    <div class="experience-tech">
                        <span class="tech-tag">AI Chatbot</span>
                        <span class="tech-tag">REST API</span>
                        <span class="tech-tag">Stripe</span>
                        <span class="tech-tag">Database</span>
                    </div>
                </div>
            </div>
            
            <div class="experience-card">
                <div class="experience-header">
                    <div class="company-logo">
                        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=80&h=80&fit=crop" alt="ConceptServe">
                        <span class="material-icons">groups</span>
                    </div>
                    <div class="company-info">
                        <h3>ConceptServe Technologies</h3>
                        <p class="position">Software Engineer Intern</p>
                        <p class="duration">January 2018 – July 2018</p>
                        <p class="location">Ahmedabad, India</p>
                    </div>
                </div>
                <div class="experience-content">
                    <ul class="achievements">
                        <li>Built scalable MVC-based social media app with CRUD operations</li>
                        <li>Integrated OTP-based 2FA with email verification</li>
                        <li>Accelerated feature delivery for posts, comments, and groups</li>
                        <li>Enhanced account security and prevented unauthorized access</li>
                    </ul>
                    <div class="experience-tech">
                        <span class="tech-tag">MVC</span>
                        <span class="tech-tag">Social Media</span>
                        <span class="tech-tag">2FA</span>
                        <span class="tech-tag">Security</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create skills cards
function createSkillsCards() {
    return `
        <div class="skills-container">
            <div class="skills-section">
                <h3 class="skills-title">Programming Languages</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="material-icons">code</span>
                        <span>Python</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">code</span>
                        <span>Java</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">javascript</span>
                        <span>JavaScript</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">web</span>
                        <span>React</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">code</span>
                        <span>Go</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">code</span>
                        <span>Rust</span>
                    </div>
                </div>
            </div>
            
            <div class="skills-section">
                <h3 class="skills-title">Frameworks & Databases</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="material-icons">hub</span>
                        <span>Node.js</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">storage</span>
                        <span>PostgreSQL</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">storage</span>
                        <span>MongoDB</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">memory</span>
                        <span>Redis</span>
                    </div>
                </div>
            </div>
            
            <div class="skills-section">
                <h3 class="skills-title">Cloud & DevOps</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="material-icons">cloud</span>
                        <span>AWS</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">inbox</span>
                        <span>Docker</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">account_tree</span>
                        <span>Kubernetes</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">source</span>
                        <span>Git</span>
                    </div>
                </div>
            </div>
            
            <div class="skills-section">
                <h3 class="skills-title">AI & Machine Learning</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="material-icons">psychology</span>
                        <span>Machine Learning</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">smart_toy</span>
                        <span>AI/ML</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">analytics</span>
                        <span>Data Science</span>
                    </div>
                    <div class="skill-card">
                        <span class="material-icons">model_training</span>
                        <span>Deep Learning</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create contact cards
function createContactCards() {
    return `
        <div class="contact-container">
            <div class="contact-card">
                <div class="contact-icon">
                    <span class="material-icons">email</span>
                </div>
                <div class="contact-content">
                    <h3>Email</h3>
                    <p>shahmoksh996@gmail.com</p>
                    <a href="mailto:shahmoksh996@gmail.com" class="contact-link">Send Email</a>
                </div>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">
                    <span class="material-icons">business</span>
                </div>
                <div class="contact-content">
                    <h3>LinkedIn</h3>
                    <p>linkedin.com/in/mshah-17</p>
                    <a href="https://linkedin.com/in/mshah-17" target="_blank" class="contact-link">Connect</a>
                </div>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">
                    <span class="material-icons">code</span>
                </div>
                <div class="contact-content">
                    <h3>GitHub</h3>
                    <p>github.com/shmoksh</p>
                    <a href="https://github.com/shmoksh" target="_blank" class="contact-link">View Profile</a>
                </div>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">
                    <span class="material-icons">phone</span>
                </div>
                <div class="contact-content">
                    <h3>Phone</h3>
                    <p>(916) 598-6993</p>
                    <a href="tel:+19165986993" class="contact-link">Call Now</a>
                </div>
            </div>
        </div>
    `;
}

// Type text with smooth word-by-word effect
async function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Move search bar below response
function moveSearchBarBelow() {
    const searchSection = document.querySelector('.search-section');
    const actionButtonsSection = document.querySelector('.action-buttons-section');
    
    // Reorder elements to put response in center and search at bottom
    mainContent.style.flexDirection = 'column';
    mainContent.style.justifyContent = 'flex-start';
    mainContent.style.alignItems = 'center';
    
    // Move search section to bottom
    searchSection.style.order = '3';
    actionButtonsSection.style.order = '1';
    responseSection.style.order = '2';
    
    // Add smooth transitions
    searchSection.style.transition = 'all 0.6s ease-out';
    actionButtonsSection.style.transition = 'all 0.6s ease-out';
    responseSection.style.transition = 'all 0.6s ease-out';
    
    // Center the response section
    responseSection.style.margin = '2rem auto';
    responseSection.style.flex = '1';
    responseSection.style.display = 'flex';
    responseSection.style.alignItems = 'center';
    responseSection.style.justifyContent = 'center';
}

// Handle input changes
function handleInputChange() {
    const hasText = searchInput.value.trim().length > 0;
    searchBtn.style.opacity = hasText ? '1' : '0.7';
    searchBtn.style.cursor = hasText ? 'pointer' : 'default';
}

// Handle keydown events
function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (searchInput.value.trim()) {
            searchForm.dispatchEvent(new Event('submit'));
        }
    }
}

// Set loading state
function setLoadingState(loading) {
    if (loading) {
        searchBtn.classList.add('loading');
        searchBtn.disabled = true;
        searchInput.disabled = true;
        
        // Disable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
    } else {
        searchBtn.classList.remove('loading');
        searchBtn.disabled = false;
        searchInput.disabled = false;
        
        // Re-enable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
    }
}

// Show error message
function showError(message) {
    // Clear previous response
    responseSection.style.display = 'none';
    responseContainer.innerHTML = '';
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    // Insert error after search section
    const searchSection = document.querySelector('.search-section');
    searchSection.parentNode.insertBefore(errorDiv, searchSection.nextSibling);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Animate elements on page load
function animateOnLoad() {
    const elements = document.querySelectorAll('.search-section, .action-buttons-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (searchInput.value.trim()) {
            searchForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        searchInput.value = '';
        handleInputChange();
        searchInput.focus();
    }
    
    // Number keys 1-5 for quick action button access
    if (e.key >= '1' && e.key <= '5') {
        const buttonIndex = parseInt(e.key) - 1;
        if (actionButtons[buttonIndex]) {
            actionButtons[buttonIndex].click();
        }
    }
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.search-section, .response-section, .action-btn');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add subtle parallax effect
        if (rect.width > 0 && rect.height > 0) {
            const moveX = (x - rect.width / 2) * 0.01;
            const moveY = (y - rect.height / 2) * 0.01;
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn')) {
        clickCount++;
        if (clickCount === 10) {
            const colors = ['#00d4ff', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = `linear-gradient(135deg, ${randomColor} 0%, ${randomColor}dd 100%)`;
            
            setTimeout(() => {
                document.body.style.background = 'var(--bg-primary)';
            }, 2000);
        }
    }
});

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add tooltip functionality for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const title = e.target.getAttribute('title');
        if (title) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                pointer-events: none;
                z-index: 1001;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: 0.5rem;
            `;
            e.target.appendChild(tooltip);
        }
    });
    
    link.addEventListener('mouseleave', (e) => {
        const tooltip = e.target.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// ===== PREDEFINED RESPONSES =====
function getPredefinedResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('me') || lowerQuery.includes('about') || lowerQuery.includes('who')) {
        return {
            type: 'text',
            content: `I'm Moksh Shah, a Software Engineer at Meta with expertise in scalable platform development, AI integration, and distributed systems. I specialize in building 0→1 products that automate workflows and enhance decision-making through intelligent solutions. With experience in Python, Java, Go, TypeScript, React, and cloud technologies, I create impactful applications that drive real-world value.`
        };
    }
    
    if (lowerQuery.includes('project')) {
        return {
            type: 'projects',
            content: [
                {
                    title: 'Stock Market WebApp',
                    description: 'RESTful APIs with 8,000+ companies stock data, stored in Amazon DynamoDB for low latency',
                    image: '📈',
                    tech: ['REST API', 'DynamoDB', 'Authentication', 'Rate Limiting', 'Interactive Charts']
                },
                {
                    title: 'Network Intrusion Detection',
                    description: 'Predictive binary classification models to distinguish between good and bad connections',
                    image: '🛡️',
                    tech: ['Machine Learning', 'LR, KNN, SVM, NN', 'Feature Engineering', 'Data Analysis']
                },
                {
                    title: 'House Price Estimation',
                    description: 'End-to-end predictive model that forecasted housing prices with 92% R² score',
                    image: '🏠',
                    tech: ['Python', 'Feature Scaling', 'Cross-validation', 'Data Science']
                }
            ]
        };
    }
    
    if (lowerQuery.includes('skill')) {
        return {
            type: 'skills',
            content: {
                'Programming Languages': [
                    { name: 'Python', icon: '🐍' },
                    { name: 'Java', icon: '☕' },
                    { name: 'Go', icon: '🐹' },
                    { name: 'TypeScript', icon: '📘' },
                    { name: 'React', icon: '⚛️' },
                    { name: 'GraphQL', icon: '🔍' },
                    { name: 'Rust', icon: '🦀' },
                    { name: 'Kotlin', icon: '🔧' },
                    { name: 'Node.js', icon: '🟢' }
                ],
                'Frameworks & Databases': [
                    { name: 'Django', icon: '🐍' },
                    { name: 'Flask', icon: '🍶' },
                    { name: 'Next.js', icon: '⚡' },
                    { name: 'Tailwind CSS', icon: '💨' },
                    { name: 'PostgreSQL', icon: '🐘' },
                    { name: 'MongoDB', icon: '🍃' },
                    { name: 'Redis', icon: '🔴' },
                    { name: 'EntQL', icon: '🔗' }
                ],
                'Cloud & DevOps': [
                    { name: 'Git', icon: '📝' },
                    { name: 'Docker', icon: '🐳' },
                    { name: 'Kubernetes', icon: '⚓' },
                    { name: 'Jenkins', icon: '🤖' },
                    { name: 'Azure', icon: '☁️' },
                    { name: 'AWS', icon: '☁️' },
                    { name: 'gRPC', icon: '🔌' },
                    { name: 'REST API', icon: '🌐' },
                    { name: 'Linux', icon: '🐧' },
                    { name: 'GenAI', icon: '🧠' }
                ]
            }
        };
    }
    
    if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
        return {
            type: 'experience',
            content: [
                {
                    company: 'Meta',
                    logo: '📘',
                    position: 'Software Engineer',
                    duration: 'June 2022 – Present',
                    location: 'California, United States',
                    achievements: [
                        'Developed 0→1 scalable platform, automating workflows and saving 3000+ hr/yr by unifying cross-functional processes',
                        'Boosted decision speed by 40% with an Agentic AI for self-serve analytics, converting natural language to data visualizations',
                        'Led org-wide query optimization, cutting fatal errors and improved API latency by 8s to 200ms enhanced reliability at scale',
                        'Co-built a custom ETL framework (Airflow-like) to sync cross-platform data, powering 220+ pipelines with 99.9% uptime',
                        'Implemented automatic SEV detection, enhancing product reliability and reducing downtime proactive issue resolution'
                    ],
                    tech: ['Python', 'React', 'AWS', 'Docker', 'AI/ML', 'ETL', 'Analytics']
                },
                {
                    company: 'Intel Corporation',
                    logo: '🔵',
                    position: 'Software Engineer Intern',
                    duration: 'February 2021 – Dec 2021',
                    location: 'California, United States',
                    achievements: [
                        'Devised a multi-processing application to execute software testing using APIs to improve execution time by approx. 40%',
                        'Coordinated with a team to restructure failure management logging systems to identify failures and create cluster groups',
                        'Worked with XFN teams to provide an automation framework to help testing scripts and capture system failure',
                        'Improved and automated CI/CD pipeline to perform regression testing and deploy packages, productivity increased by 35%'
                    ],
                    tech: ['Python', 'APIs', 'CI/CD', 'Automation', 'Testing', 'Logging']
                },
                {
                    company: 'Turabit Solution Pvt. Ltd.',
                    logo: '💼',
                    position: 'Software Engineer',
                    duration: 'July 2018 – April 2019',
                    location: 'Ahmedabad, India',
                    achievements: [
                        'Built a conversational AI chatbot that automates IT services that reduce 80% of mundane tasks supported at various platforms',
                        'Improved integration efficiency by 40% supporting secure REST APIs for end-to-end cross-platform implementation',
                        'Integrated "pay as you go" service using stripe payment gateway in a web app that creates customizable chatbots in 5 mins',
                        'Discussed with teams to redesign database architecture including backup/recovery, data storage and security'
                    ],
                    tech: ['AI/ML', 'REST APIs', 'Stripe', 'Database Design', 'Security']
                },
                {
                    company: 'ConceptServe Technologies',
                    logo: '🏢',
                    position: 'Software Engineer Intern',
                    duration: 'January 2018 – July 2018',
                    location: 'Ahmedabad, India',
                    achievements: [
                        'Built a scalable MVC-based social media app with CRUD for posts, comments, and groups to accelerate feature delivery',
                        'Integrated OTP-based 2FA with email verification to enhance account security and prevent unauthorized access'
                    ],
                    tech: ['MVC', 'CRUD', '2FA', 'Email Verification', 'Security']
                }
            ]
        };
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin') || lowerQuery.includes('github')) {
        return {
            type: 'contact',
            content: [
                {
                    title: 'Email',
                    description: 'Get in touch for opportunities',
                    icon: 'email',
                    link: 'mailto:shahmoksh996@gmail.com',
                    linkText: 'Send Email'
                },
                {
                    title: 'LinkedIn',
                    description: 'Professional network',
                    icon: 'link',
                    link: 'https://linkedin.com/in/mshah-17',
                    linkText: 'Connect'
                },
                {
                    title: 'GitHub',
                    description: 'View my projects',
                    icon: 'code',
                    link: 'https://github.com/shmoksh',
                    linkText: 'View Profile'
                },
                {
                    title: 'Website',
                    description: 'Visit my portfolio',
                    icon: 'language',
                    link: 'https://www.shahmoksh.me',
                    linkText: 'Visit Site'
                }
            ]
        };
    }
    
    return null;
}

// ===== AI API CALL =====
async function sendToAI(query) {
    if (isTyping) return;
    
    isTyping = true;
    showTypingIndicator();
    
    try {
        const response = await fetch('/.netlify/functions/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: query })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        displayResponse({
            type: 'text',
            content: data.response
        });
        
    } catch (error) {
        console.error('Error:', error);
        displayError('Sorry, I encountered an error. Please try again.');
    } finally {
        isTyping = false;
        hideTypingIndicator();
    }
}

// ===== TYPING INDICATOR =====
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    responseContainer.appendChild(indicator);
}

function hideTypingIndicator() {
    const indicator = responseContainer.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// ===== RESPONSE DISPLAY =====
function displayResponse(response) {
    responseSection.style.display = 'block';
    responseContainer.innerHTML = '';
    
    if (response.type === 'text') {
        displayTextResponse(response.content);
    } else if (response.type === 'projects') {
        displayProjectsResponse(response.content);
    } else if (response.type === 'skills') {
        displaySkillsResponse(response.content);
    } else if (response.type === 'experience') {
        displayExperienceResponse(response.content);
    } else if (response.type === 'contact') {
        displayContactResponse(response.content);
    }
    
    // Move search to bottom
    document.querySelector('.search-section').style.order = '999';
    
    // Add flip functionality only for projects and experience cards
    setTimeout(addFlipFunctionality, 100);
}

function displayTextResponse(text) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'response-text';
    responseDiv.textContent = '';
    responseContainer.appendChild(responseDiv);
    
    // Type out the response
    typeWriter(responseDiv, text, 30);
}

function displayProjectsResponse(projects) {
    const grid = document.createElement('div');
    grid.className = 'projects-grid';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-card-inner">
                <div class="project-card-front">
                    <div class="project-thumbnail">
                        <span style="font-size: 3rem;">${project.image}</span>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </div>
                <div class="project-card-back">
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    responseContainer.appendChild(grid);
}

function displaySkillsResponse(skills) {
    const container = document.createElement('div');
    container.className = 'skills-container';
    
    Object.entries(skills).forEach(([category, skillList]) => {
        const section = document.createElement('div');
        section.className = 'skills-section';
        
        const title = document.createElement('h3');
        title.className = 'skills-title';
        title.textContent = category;
        section.appendChild(title);
        
        const grid = document.createElement('div');
        grid.className = 'skills-grid';
        
        skillList.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.innerHTML = `
                <span class="material-icons">${skill.icon}</span>
                <span>${skill.name}</span>
            `;
            grid.appendChild(card);
        });
        
        section.appendChild(grid);
        container.appendChild(section);
    });
    
    responseContainer.appendChild(container);
}

function displayExperienceResponse(experiences) {
    const grid = document.createElement('div');
    grid.className = 'experience-grid';
    
    experiences.forEach(experience => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.innerHTML = `
            <div class="experience-card-inner">
                <div class="experience-card-front">
                    <div class="company-logo">
                        <span style="font-size: 2rem;">${experience.logo}</span>
                    </div>
                    <div class="company-info">
                        <h3>${experience.company}</h3>
                        <div class="position">${experience.position}</div>
                        <div class="duration">${experience.duration}</div>
                        <div class="location">${experience.location}</div>
                    </div>
                </div>
                <div class="experience-card-back">
                    <div class="experience-content">
                        <h3>${experience.company}</h3>
                        <ul class="achievements">
                            ${experience.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                        <div class="experience-tech">
                            ${experience.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    responseContainer.appendChild(grid);
}

function displayContactResponse(contacts) {
    const container = document.createElement('div');
    container.className = 'contact-container';
    
    contacts.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <div class="contact-icon">
                <span class="material-icons">${contact.icon}</span>
            </div>
            <div class="contact-content">
                <h3>${contact.title}</h3>
                <p>${contact.description}</p>
                <a href="${contact.link}" class="contact-link" target="_blank">${contact.linkText}</a>
            </div>
        `;
        container.appendChild(card);
    });
    
    responseContainer.appendChild(container);
}

// ===== FLIP FUNCTIONALITY (ONLY FOR PROJECTS & EXPERIENCE) =====
function addFlipFunctionality() {
    // Add click listeners only to project and experience cards
    const cards = document.querySelectorAll('.project-card, .experience-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// ===== ERROR HANDLING =====
function displayError(message) {
    responseSection.style.display = 'block';
    responseContainer.innerHTML = `<div class="error">${message}</div>`;
} 