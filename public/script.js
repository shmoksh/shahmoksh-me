import { APIService } from './js/modules/apiService.js';
import { UIManager } from './js/modules/uiManager.js';

class PortfolioChat {
    constructor() {
        this.apiService = new APIService();
        this.ui = new UIManager();
        this.isProcessing = false;
    }

    init() {
        this.ui.init();
        this.bindEvents();
        this.ui.setStatus('Online');
        this.ui.addMessage('assistant', this.apiService.getIntroMessage());
    }

    bindEvents() {
        this.ui.chatForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });

        this.ui.chatInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.handleSubmit();
            }
        });

        this.ui.promptButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const prompt = button.getAttribute('data-prompt');
                if (prompt) {
                    this.submitQuery(prompt);
                }
            });
        });

        document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                this.ui.focusInput();
            }
        });
    }

    handleSubmit() {
        const query = this.ui.chatInput.value.trim();
        if (!query) return;
        this.submitQuery(query);
    }

    async submitQuery(query) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        this.ui.setSendingState(true);
        this.ui.setStatus('Thinking', true);
        this.ui.addMessage('user', query);
        this.ui.clearInput();
        this.ui.showTypingIndicator();

        try {
            const result = await this.apiService.askQuestion(query);
            this.ui.removeTypingIndicator();
            if (result.success) {
                this.ui.addMessage('assistant', result.data);
                this.ui.setStatus('Online');
            } else {
                this.ui.addMessage('assistant', `I could not reach the AI service. ${result.error}`);
                this.ui.setStatus('Offline', true);
            }
        } catch (error) {
            this.ui.removeTypingIndicator();
            this.ui.addMessage('assistant', 'Sorry, something went wrong. Please try again.');
            this.ui.setStatus('Offline', true);
        } finally {
            this.isProcessing = false;
            this.ui.setSendingState(false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioChat();
    app.init();
});
