// UI Manager Module
import { ResponseRenderer } from './responseRenderer.js';

export class UIManager {
    constructor() {
        this.responseRenderer = new ResponseRenderer();
        this.typingMessage = null;
    }

    init() {
        this.chatStream = document.getElementById('chat-stream');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.promptButtons = Array.from(document.querySelectorAll('[data-prompt]'));
        this.statusPill = document.getElementById('chat-status');

        this.setupAutoResize();
    }

    setupAutoResize() {
        const resize = () => {
            this.chatInput.style.height = 'auto';
            const height = Math.min(this.chatInput.scrollHeight, 120);
            this.chatInput.style.height = `${height}px`;
        };

        this.chatInput.addEventListener('input', resize);
        resize();
    }

    setStatus(text, isBusy = false) {
        if (!this.statusPill) return;
        this.statusPill.textContent = text;
        this.statusPill.classList.toggle('is-busy', isBusy);
    }

    setSendingState(isSending) {
        if (!this.sendBtn) return;
        this.sendBtn.disabled = isSending;
    }

    addMessage(role, content) {
        const message = document.createElement('div');
        message.className = `chat-message is-${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.textContent = role === 'assistant' ? 'AI' : 'YOU';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = this.responseRenderer.format(content);

        const meta = document.createElement('div');
        meta.className = 'chat-meta';
        meta.textContent = role === 'assistant' ? 'Assistant' : 'You';
        bubble.appendChild(meta);

        if (role === 'user') {
            message.appendChild(bubble);
            message.appendChild(avatar);
        } else {
            message.appendChild(avatar);
            message.appendChild(bubble);
        }

        this.chatStream.appendChild(message);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        if (this.typingMessage) return;

        const message = document.createElement('div');
        message.className = 'chat-message is-assistant';

        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.textContent = 'AI';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = `
            <div class="typing-indicator" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="chat-meta">Thinking</div>
        `;

        message.appendChild(avatar);
        message.appendChild(bubble);

        this.typingMessage = message;
        this.chatStream.appendChild(message);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        if (this.typingMessage) {
            this.typingMessage.remove();
            this.typingMessage = null;
        }
    }

    clearInput() {
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
    }

    focusInput() {
        this.chatInput.focus();
    }

    setInputValue(text) {
        this.chatInput.value = text;
        this.chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    scrollToBottom() {
        this.chatStream.scrollTop = this.chatStream.scrollHeight;
    }
}
