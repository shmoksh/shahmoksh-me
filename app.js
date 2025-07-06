const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load about.txt content if it exists
let aboutContent = '';
try {
  aboutContent = fs.readFileSync('about.txt', 'utf8');
} catch (error) {
  console.log('about.txt not found, using default content');
  aboutContent = `Moksh Shah is a Software Engineer at Meta with expertise in scalable platforms, AI/ML, and performance optimization. Previously worked at Intel, Turabit Solutions, and ConceptServe Technologies.`;
}

// System prompt based on about.txt
const systemPrompt = `You are Moksh Shah's AI assistant. Key info: Software Engineer at Meta (2022-present), previously Intel intern, Turabit Solutions, ConceptServe Technologies. Skills: Python, Java, JavaScript, React, Go, Rust, AWS, Docker, Kubernetes, Git. Projects: Stock Market WebApp, Network Intrusion Detection, House Price Estimation. Contact: shahmoksh996@gmail.com, LinkedIn: mshah-17, GitHub: shmoksh. Be helpful, concise, and professional.`;

// API route for AI chat
app.post('/ask', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 AI Portfolio Website ready!`);
}); 