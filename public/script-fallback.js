// Fallback script for browsers without ES6 module support
console.log('ES6 modules not supported, using fallback');

document.addEventListener('DOMContentLoaded', function() {
    var chatStream = document.getElementById('chat-stream');
    var chatForm = document.getElementById('chat-form');
    var chatInput = document.getElementById('chat-input');
    var chatStatus = document.getElementById('chat-status');
    var promptButtons = document.querySelectorAll('[data-prompt]');

    if (!chatStream || !chatForm || !chatInput) return;

    if (chatStatus) {
        chatStatus.textContent = 'Limited';
    }

    function addMessage(role, text) {
        var message = document.createElement('div');
        message.className = 'chat-message is-' + role;

        var avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.textContent = role === 'assistant' ? 'AI' : 'YOU';

        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text;

        if (role === 'user') {
            message.appendChild(bubble);
            message.appendChild(avatar);
        } else {
            message.appendChild(avatar);
            message.appendChild(bubble);
        }

        chatStream.appendChild(message);
        chatStream.scrollTop = chatStream.scrollHeight;
    }

    addMessage('assistant', 'This chat experience needs a modern browser with ES6 module support.');

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var query = chatInput.value.trim();
        if (!query) return;
        addMessage('user', query);
        addMessage('assistant', 'Please switch to a modern browser for AI responses.');
        chatInput.value = '';
    });

    promptButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var prompt = button.getAttribute('data-prompt');
            if (!prompt) return;
            addMessage('user', prompt);
            addMessage('assistant', 'Open this site in a modern browser to continue the chat.');
        });
    });
});
