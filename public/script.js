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
                    this.submitQuery(prompt, { useApi: false });
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
        this.submitQuery(query, { useApi: true });
    }

    async submitQuery(query, { useApi }) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        this.ui.setSendingState(true);
        this.ui.setStatus('Thinking', true);
        this.ui.addMessage('user', query);
        this.ui.clearInput();
        this.ui.showTypingIndicator();

        try {
            if (!useApi) {
                await this.sleep(600);
            }
            const response = await this.getResponse(query, { useApi });
            this.ui.removeTypingIndicator();
            this.ui.addMessage('assistant', response);
            this.ui.setStatus('Online');
        } catch (error) {
            this.ui.removeTypingIndicator();
            this.ui.addMessage('assistant', 'Sorry, something went wrong. Please try again.');
            this.ui.setStatus('Offline', true);
        } finally {
            this.isProcessing = false;
            this.ui.setSendingState(false);
        }
    }

    async getResponse(query, { useApi }) {
        const predefinedAction = this.apiService.shouldUsePredefinedResponse(query);
        if (predefinedAction) {
            return this.apiService.getPredefinedResponse(predefinedAction);
        }

        if (!useApi) {
            return this.apiService.getFallbackReply();
        }

        if (this.apiService.isMokshRelated(query)) {
            const result = await this.apiService.askQuestion(query);
            if (result.success) {
                return result.data;
            }
            return `I could not reach the AI service. ${result.error}`;
        }

        return this.apiService.getFallbackReply();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioChat();
    app.init();
});
