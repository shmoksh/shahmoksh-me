// Response Renderer Module
export class ResponseRenderer {
    format(content) {
        if (!content) return '';

        const escaped = this.escapeHTML(content);
        const { text, blocks } = this.extractCodeBlocks(escaped);
        return this.formatParagraphs(text, blocks);
    }

    escapeHTML(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    extractCodeBlocks(text) {
        const blocks = [];
        const replaced = text.replace(/```([\s\S]*?)```/g, (match, code) => {
            const cleaned = code.trim();
            const token = `__CODE_BLOCK_${blocks.length}__`;
            blocks.push(`<pre><code>${cleaned}</code></pre>`);
            return token;
        });

        return { text: replaced, blocks };
    }

    formatParagraphs(text, blocks) {
        const lines = text.split(/\n+/);
        let html = '';
        let inList = false;

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) {
                if (inList) {
                    html += '</ul>';
                    inList = false;
                }
                continue;
            }

            const codeMatch = trimmed.match(/^__CODE_BLOCK_(\d+)__$/);
            if (codeMatch) {
                if (inList) {
                    html += '</ul>';
                    inList = false;
                }
                const index = Number(codeMatch[1]);
                html += blocks[index] || '';
                continue;
            }

            if (trimmed.startsWith('- ')) {
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                html += `<li>${this.formatInline(trimmed.slice(2))}</li>`;
            } else {
                if (inList) {
                    html += '</ul>';
                    inList = false;
                }
                html += `<p>${this.formatInline(trimmed)}</p>`;
            }
        }

        if (inList) {
            html += '</ul>';
        }

        return html;
    }

    formatInline(text) {
        return text
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    }
}
