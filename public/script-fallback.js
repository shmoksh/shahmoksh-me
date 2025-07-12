// Fallback script for browsers without ES6 module support
console.log('ES6 modules not supported, using fallback');

// Simple fallback functionality
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const responseSection = document.getElementById('response-section');
    const responseContainer = document.getElementById('response-container');

    // Simple action button handling
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            actionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show a simple message
            responseSection.style.display = 'block';
            responseContainer.innerHTML = `
                <div class="response-content">
                    <h3>Feature Not Available</h3>
                    <p>Please use a modern browser with ES6 module support for the full experience.</p>
                </div>
            `;
        });
    });

    // Simple search handling
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchInput.value.trim();
        if (!query) return;
        
        responseSection.style.display = 'block';
        responseContainer.innerHTML = `
            <div class="response-content">
                <h3>Search Feature</h3>
                <p>You searched for: "${query}"</p>
                <p>Please use a modern browser for AI-powered responses.</p>
            </div>
        `;
    });
}); 