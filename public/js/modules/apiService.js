// API Service Module — thin client for the Gemini-backed /api/ask endpoint.
// Guardrail (off-topic detection) lives server-side in functions/api.js.
export class APIService {
    constructor() {
        this.baseURL = '/api';
    }

    getIntroMessage() {
        return `Hi, I am Moksh's AI portfolio assistant. Ask me about experience, projects, skills, or impact. You can also tap a prompt to get started.`;
    }

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
