// Main Portfolio Application
import { portfolioData } from './js/modules/portfolioData.js';
import { UIManager } from './js/modules/uiManager.js';
import { APIService } from './js/modules/apiService.js';

class PortfolioApp {
    constructor() {
        this.uiManager = new UIManager();
        this.apiService = new APIService();
        this.currentSection = 'me';
        this.isProcessing = false;
        this.chatHistory = [];
    }

    async init() {
        // Initialize UI
        this.uiManager.init();
        
        // Add event listeners
        this.addEventListeners();
        
        // Don't set any button as active initially
        // this.uiManager.updateActiveButton(document.querySelector('.me-btn'));
    }

    addEventListeners() {
        // Action button clicks
        document.querySelectorAll('.action-btn').forEach(button => {
            button.addEventListener('click', (e) => this.handleActionButtonClick(e));
        });

        // Search form submission
        document.getElementById('search-form').addEventListener('submit', (e) => this.handleSearchSubmit(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Modal close button
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());

        // Modal backdrop click
        document.getElementById('card-modal').addEventListener('click', (e) => {
            if (e.target.id === 'card-modal') {
                this.closeModal();
            }
        });
    }

    async handleActionButtonClick(event) {
        event.preventDefault();
        
        if (this.isProcessing) return;
        
        const button = event.currentTarget;
        const buttonClass = button.className;
        
        // Determine section type
        let sectionType = '';
        if (buttonClass.includes('me-btn')) sectionType = 'me';
        else if (buttonClass.includes('projects-btn')) sectionType = 'projects';
        else if (buttonClass.includes('experience-btn')) sectionType = 'experience';
        else if (buttonClass.includes('skills-btn')) sectionType = 'skills';
        else if (buttonClass.includes('contact-btn')) sectionType = 'contact';
        
        // Update UI
        this.uiManager.updateActiveButton(button);
        
        // Set search input with typing effect
        const searchText = `Tell me about Moksh's ${sectionType}`;
        await this.uiManager.setSearchInputWithTyping(searchText);
        
        // Process the request for AI response only (no card display)
        await this.processRequest(searchText, sectionType);
    }

    async handleSearchSubmit(event) {
        event.preventDefault();
        
        if (this.isProcessing) return;
        
        const query = document.getElementById('search-input').value.trim();
        if (!query) return;
        
        // Add user message to chat
        this.addChatMessage('user', query);
        
        await this.processRequest(query);
    }

    async processRequest(query, predefinedSection = null) {
        this.isProcessing = true;
        
        // Show loading
        this.uiManager.showLoading();
        
        try {
            let response;
            let context = 'default';
            
            // Check if we should use predefined response
            if (predefinedSection) {
                response = this.apiService.getPredefinedResponse(predefinedSection);
                context = predefinedSection; // Use the section type as context
            } else {
                const predefinedAction = this.apiService.shouldUsePredefinedResponse(query);
                if (predefinedAction) {
                    response = this.apiService.getPredefinedResponse(predefinedAction);
                    context = predefinedAction; // Use the detected action as context
                } else {
                    // Check if query is related to Moksh's content
                    if (this.apiService.isMokshRelated(query)) {
                        // Use AI for complex queries related to Moksh
                        const result = await this.apiService.askQuestion(query);
                        if (result.success) {
                            response = result.data;
                            // Use default context for AI responses to avoid card layouts
                            context = 'default';
                        } else {
                            throw new Error(result.error);
                        }
                    } else {
                        // Show fallback reply for unrelated queries
                        response = this.apiService.getFallbackReply();
                        context = 'default';
                    }
                }
            }
            
            // Add AI response to chat
            this.addChatMessage('assistant', response);
            
            // Show response with typing effect and proper context for dynamic layout
            await this.uiManager.showResponse(response, query, context);
            
            // Smooth scroll to response
            this.smoothScrollToResponse();
            
        } catch (error) {
            console.error('Error processing request:', error);
            this.uiManager.showError(error.message || 'An error occurred');
        } finally {
            this.isProcessing = false;
        }
    }

    addChatMessage(role, content) {
        this.chatHistory.push({ role, content, timestamp: Date.now() });
        this.uiManager.updateChatHistory(this.chatHistory);
    }

    smoothScrollToResponse() {
        const responseSection = document.querySelector('.response-section');
        if (responseSection) {
            responseSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    // Modal functionality
    showModal(cardData) {
        const modal = document.getElementById('card-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        modalTitle.textContent = cardData.title;
        
        let modalContent = '';
        
        if (cardData.details) {
            const details = cardData.details;
            
            // Overview section
            if (details.overview) {
                modalContent += `
                    <div class="modal-section">
                        <h3>📋 Overview</h3>
                        <p>${details.overview}</p>
                    </div>
                `;
            }
            
            // Technologies section
            if (details.technologies) {
                modalContent += `
                    <div class="modal-section">
                        <h3>🛠️ Technologies</h3>
                        <div class="modal-tech-list">
                            ${details.technologies.map(tech => `<span class="modal-tech-item">${tech}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
            
            // Features section
            if (details.features) {
                modalContent += `
                    <div class="modal-section">
                        <h3>✨ Features</h3>
                        <ul>
                            ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Responsibilities section (for experience)
            if (details.responsibilities) {
                modalContent += `
                    <div class="modal-section">
                        <h3>🎯 Responsibilities</h3>
                        <ul>
                            ${details.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Achievements section
            if (details.achievements) {
                modalContent += `
                    <div class="modal-section">
                        <h3>🏆 Achievements</h3>
                        <ul>
                            ${details.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Challenges section
            if (details.challenges) {
                modalContent += `
                    <div class="modal-section">
                        <h3>🚧 Challenges</h3>
                        <ul>
                            ${details.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Outcomes section
            if (details.outcomes) {
                modalContent += `
                    <div class="modal-section">
                        <h3>📈 Outcomes</h3>
                        <ul>
                            ${details.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Expertise section (for skills)
            if (details.expertise) {
                modalContent += `
                    <div class="modal-section">
                        <h3>💡 Expertise</h3>
                        <div class="modal-expertise">
                            ${Object.entries(details.expertise).map(([key, value]) => `
                                <div class="modal-expertise-item">
                                    <h5>${key}</h5>
                                    <p>${value}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            // Experience section (for skills)
            if (details.experience) {
                modalContent += `
                    <div class="modal-section">
                        <h3>🎯 Experience</h3>
                        <ul>
                            ${details.experience.map(exp => `<li>${exp}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        
        modalBody.innerHTML = modalContent;
        modal.style.display = 'block';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('card-modal');
        modal.style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    // Add card click handlers
    addCardClickHandlers() {
        document.querySelectorAll('.card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const sectionType = this.currentSection;
                const data = portfolioData[sectionType];
                
                if (data && data.cards && data.cards[index]) {
                    this.showModal(data.cards[index]);
                }
            });
        });
    }

    handleKeyboardShortcuts(event) {
        // Escape to clear and go back to normal mode
        if (event.key === 'Escape') {
            document.getElementById('search-input').value = '';
            this.uiManager.hideResponse();
            this.closeModal();
        }
        
        // Ctrl/Cmd + K to focus search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            document.getElementById('search-input').focus();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const app = new PortfolioApp();
    await app.init();
}); 