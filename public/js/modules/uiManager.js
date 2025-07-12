// UI Manager Module
import { ResponseRenderer } from './responseRenderer.js';

export class UIManager {
    constructor() {
        this.currentState = 'initial';
        this.typingSpeed = 12; // Slightly slower typing (was 8)
        this.isTyping = false;
        this.responseRenderer = new ResponseRenderer();
    }

    // Initialize UI elements
    init() {
        this.searchInput = document.getElementById('search-input');
        this.searchForm = document.getElementById('search-form');
        this.responseSection = document.getElementById('response-section');
        this.responseContainer = document.getElementById('response-container');
        this.actionButtons = document.querySelectorAll('.action-btn');
        this.mainContent = document.querySelector('.main-content');
        this.header = document.querySelector('.header');
        this.actionButtonsSection = document.querySelector('.action-buttons-section');
        this.searchSection = document.querySelector('.search-section');
        this.searchBtn = document.getElementById('search-btn');
        
        // Update placeholder text with rotating hints
        this.updatePlaceholder();
        
        // Focus search input for better UX
        setTimeout(() => {
            this.searchInput.focus();
        }, 500);
    }

    // Update placeholder with rotating hints
    updatePlaceholder() {
        const hints = [
            "Ask me about my experience at Meta...",
            "Tell me about my projects...",
            "What are my technical skills?",
            "How can I contact you?",
            "What did I do at Intel?",
            "Tell me about my education..."
        ];
        
        let currentHint = 0;
        
        const updatePlaceholderText = () => {
            this.searchInput.placeholder = hints[currentHint];
            currentHint = (currentHint + 1) % hints.length;
        };
        
        // Update every 3 seconds
        setInterval(updatePlaceholderText, 3000);
    }

    // Update chat history display
    updateChatHistory(chatHistory) {
        // This will be used for multi-turn conversations
        // For now, we'll just show the latest response
        if (chatHistory.length > 0) {
            const lastMessage = chatHistory[chatHistory.length - 1];
            if (lastMessage.role === 'assistant') {
                // The response will be shown by showResponse method
            }
        }
    }

    // Set search input value with typing effect
    async setSearchInputWithTyping(text) {
        this.searchInput.value = '';
        this.isTyping = true;
        
        for (let i = 0; i < text.length; i++) {
            if (!this.isTyping) break;
            this.searchInput.value += text[i];
            await this.sleep(this.typingSpeed);
        }
        
        this.isTyping = false;
    }

    // Type response with typing effect
    async typeResponse(response, container, context = 'default') {
        container.innerHTML = '';
        this.isTyping = true;
        
        // For dynamic layouts, we'll render the full layout immediately
        // but animate the content appearance
        const renderedContent = this.responseRenderer.renderResponse(response, context);
        container.innerHTML = renderedContent;
        
        // Add fade-in animation to the rendered content
        const contentElements = container.querySelectorAll('*');
        contentElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; // Slightly slower animation
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 60); // Slightly slower stagger (was 50)
        });
        
        this.isTyping = false;
    }

    // Show loading state
    showLoading() {
        this.responseSection.style.display = 'block';
        this.responseContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <p class="loading-text">Thinking...</p>
            </div>
        `;
        
        // Update search button
        this.updateSearchButton('loading');
    }

    // Show response with dynamic layout
    async showResponse(response, query = '', context = null) {
        this.responseSection.style.display = 'block';
        this.responseContainer.innerHTML = '<div class="response-content"></div>';
        
        // Update search button
        this.updateSearchButton('responding');
        
        // Use provided context or detect from query
        const detectedContext = context || this.responseRenderer.detectContext(query);
        
        await this.typeResponse(response, this.responseContainer.querySelector('.response-content'), detectedContext);
        
        // Reset search button
        this.updateSearchButton('default');
    }

    // Show error
    showError(message) {
        this.responseSection.style.display = 'block';
        this.responseContainer.innerHTML = `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
        
        // Reset search button
        this.updateSearchButton('default');
    }

    // Update search button state
    updateSearchButton(state) {
        const searchBtn = this.searchBtn;
        const icon = searchBtn.querySelector('.material-icons');
        
        switch(state) {
            case 'loading':
                searchBtn.disabled = true;
                searchBtn.style.background = 'var(--gradient-2)';
                icon.textContent = 'hourglass_empty';
                break;
            case 'responding':
                searchBtn.disabled = true;
                searchBtn.style.background = 'var(--gradient-3)';
                icon.textContent = 'auto_awesome';
                break;
            default:
                searchBtn.disabled = false;
                searchBtn.style.background = 'var(--gradient-1)';
                icon.textContent = 'search';
                break;
        }
    }

    // Update active button
    updateActiveButton(clickedButton) {
        this.actionButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
    }

    // Sleep utility
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Stop typing
    stopTyping() {
        this.isTyping = false;
    }

    // Hide response section
    hideResponse() {
        this.responseSection.style.display = 'none';
    }
} 