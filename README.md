# AI Portfolio Website - Modern & Responsive

A modern, AI-powered personal portfolio website built with Express.js and Google Gemini integration. Features a clean, professional design with full mobile responsiveness and a strict topic guardrail — the assistant only answers questions about Moksh.

## ✨ Major Updates & Improvements

### 🎨 UI/UX Enhancements
- **Removed cursor-based animations** - All content is now static and professional
- **Modern card-based layout** - Clean, consistent design with proper spacing and shadows
- **Tailwind-inspired design system** - Professional color palette and typography
- **Enhanced visual hierarchy** - Better contrast and readability

### 📱 Responsive Design
- **Full mobile optimization** - Works perfectly on phones, tablets, and desktops
- **Flexible navigation** - Buttons adapt to screen size with proper spacing
- **No horizontal scrolling** - Content properly contained on all devices
- **Touch-friendly interactions** - Optimized for mobile touch interfaces

### 🤖 Gemini Integration with Guardrail
- **Google Gemini (`gemini-2.5-flash`)** - Fast, cost-effective inference via `@google/generative-ai`
- **Server-side guardrail** - Only answers questions about Moksh; off-topic questions receive a fixed redirect message (robust against prompt injection)
- **Comprehensive data source** - Pulls from detailed portfolio information
- **Better error handling** - Graceful handling of API issues and key misconfiguration
- **Loading states** - Professional loading indicators during AI processing

### ♿ Accessibility Improvements
- **Semantic HTML** - Proper heading structure and landmarks
- **ARIA labels** - Screen reader support for all interactive elements
- **Keyboard navigation** - Full keyboard accessibility
- **High contrast support** - Respects user's contrast preferences
- **Reduced motion** - Respects user's motion preferences

## 🚀 Features

- 🤖 **AI-Powered Search**: Ask questions about Moksh's experience, projects, and skills
- 📱 **Fully Responsive**: Optimized for all screen sizes and devices
- 🎨 **Modern Design**: Clean, professional interface with consistent styling
- ⚡ **Fast Performance**: Optimized loading and smooth interactions
- 🔒 **Secure**: Environment-based configuration for API keys
- ♿ **Accessible**: WCAG compliant with proper semantic markup

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Integration**: Google Gemini (`gemini-2.5-flash`)
- **Styling**: Custom CSS with modern design system
- **Fonts**: JetBrains Mono (monospace)
- **Icons**: Material Icons

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shahmoksh-me
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Google Gemini API key from https://aistudio.google.com/app/apikey
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3001`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
```

The `.env` file is gitignored. Never commit secrets — only `.env.example` (with placeholder) is tracked. For production, set `GEMINI_API_KEY` in the Netlify dashboard (**Site settings → Environment variables**).

## 📁 Project Structure

```
shahmoksh-me/
├── app.js                 # Express server with Gemini integration + guardrail
├── about.txt             # Comprehensive portfolio data
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (create this)
├── public/               # Static files
│   ├── index.html        # Main HTML with semantic markup
│   ├── style.css         # Modern responsive styles
│   └── script.js         # Enhanced frontend functionality
├── functions/            # Netlify functions (if deployed)
├── netlify.toml         # Netlify configuration
└── README.md            # This file
```

## 🎯 Key Sections

### Navigation
- **Me**: About Moksh, achievements, and education
- **Projects**: Stock Market WebApp, Network Intrusion Detection, House Price Estimation
- **Experience**: Meta, Intel, Turabit Solutions, ConceptServe Technologies
- **Skills**: Programming languages, frameworks, DevOps, AI/ML
- **Contact**: Email, phone, LinkedIn, GitHub

### AI Search Examples
- "Tell me about Moksh's experience at Meta"
- "What projects has Moksh built?"
- "What are Moksh's technical skills?"
- "How can I contact Moksh?"

## 🔧 Customization

### Content Updates
- Edit `about.txt` to update portfolio information
- Modify section data in `script.js`
- Update styling in `style.css`

### AI Integration
- Enhanced system prompt with comprehensive portfolio data
- Better error handling for API issues
- Improved response formatting

## 🌐 API Endpoints

- `GET /` - Serves the main portfolio page
- `POST /ask` - AI chat endpoint (requires `GEMINI_API_KEY`)
- `GET /api/health` - Health check endpoint

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `public`
4. Add environment variables in Netlify dashboard

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Configure environment variables

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git: `git push heroku main`

## 🎨 Design System

### Colors
- Primary: `#3b82f6` (Blue)
- Secondary: `#64748b` (Slate)
- Accent: `#f59e0b` (Amber)
- Background: `#ffffff` (White)
- Surface: `#f8fafc` (Gray-50)

### Typography
- Font: JetBrains Mono (monospace)
- Responsive sizing with clamp()
- Proper line heights and spacing

### Components
- Cards with consistent border-radius and shadows
- Buttons with hover states and focus indicators
- Form inputs with proper validation states
- Loading spinners and error states

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for all interactive elements
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences
- Screen reader compatibility

## 🔄 Recent Updates

- ✅ Removed cursor-based animations
- ✅ Implemented modern card layout
- ✅ Enhanced mobile responsiveness
- ✅ Improved OpenAI integration
- ✅ Added comprehensive accessibility features
- ✅ Updated design system with Tailwind-inspired styling
- ✅ Enhanced error handling and loading states

## 📄 License

MIT License - see LICENSE file for details
