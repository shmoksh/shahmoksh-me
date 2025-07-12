#!/bin/bash

# Portfolio Website Deployment Script

echo "🚀 Deploying Portfolio Website..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Build and deploy to Netlify
echo "📦 Building and deploying..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=public

echo "✅ Deployment complete!"
echo "🌍 Your portfolio is live at: https://shahmoksh-me.netlify.app" 