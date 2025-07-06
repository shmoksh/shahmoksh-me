# AI-Powered Portfolio Website

A modern, AI-powered personal portfolio website built with Node.js, Express, and OpenAI GPT-3.5. Features an intelligent chatbot that can answer questions about Moksh Shah's background, experience, projects, and skills.

## 🚀 Features

- **AI-Powered Chat**: Intelligent responses using OpenAI GPT-3.5
- **Interactive UI**: Modern, responsive design with smooth animations
- **Predefined Responses**: Fast responses for common queries (Me, Projects, Skills, Experience, Contact)
- **Real-time Search**: Dynamic search functionality with typing effects
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI**: OpenAI GPT-3.5 API
- **Styling**: Custom CSS with modern animations
- **Icons**: Material Design Icons

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-portfolio-website.git
   cd ai-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your OpenAI API key
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

## 📁 Project Structure

```
ai-portfolio-website/
├── public/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styles
│   └── script.js           # Frontend JavaScript
├── app.js                  # Express server
├── about.txt               # Personal information
├── package.json            # Dependencies
├── .env                    # Environment variables (not in git)
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🎯 Usage

### Predefined Queries
- **"me"** - Personal introduction
- **"projects"** - Portfolio projects
- **"skills"** - Technical skills
- **"experience"** - Work experience
- **"contact"** - Contact information

### Custom Queries
Ask any question about Moksh Shah and the AI will respond based on the provided information.

## 🔧 Configuration

### OpenAI API Setup
1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add it to your `.env` file
3. The system prompt is automatically generated from `about.txt`

### Customizing Content
- Update `about.txt` with your information
- Modify predefined responses in `script.js`
- Customize styling in `style.css`

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production Deployment
1. Set up your production environment variables
2. Deploy to your preferred hosting service (Heroku, Vercel, etc.)
3. Ensure your `.env` file is properly configured

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Email**: shahmoksh996@gmail.com
- **LinkedIn**: linkedin.com/in/mshah-17
- **GitHub**: github.com/shmoksh
- **Website**: www.shahmoksh.me

---

Built with ❤️ by Moksh Shah
