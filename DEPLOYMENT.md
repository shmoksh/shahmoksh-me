# Deployment Guide - Fix OpenAI Search Issues

## 🚨 Current Issue
The search functionality is not working because the OpenAI API key is not configured in the Netlify environment.

## 🔧 Quick Fix Steps

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)

### 2. Configure Netlify Environment Variables

#### Option A: Netlify Dashboard
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add new variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (e.g., `sk-...`)
4. Click **Save**
5. Redeploy your site

#### Option B: Netlify CLI
```bash
# Install Netlify CLI if not installed
npm install -g netlify-cli

# Login to Netlify
netlify login

# Set environment variable
netlify env:set OPENAI_API_KEY "your_openai_api_key_here"

# Redeploy
netlify deploy --prod
```

### 3. Verify Configuration
After setting the environment variable:
1. Your site will automatically redeploy
2. Test the search functionality
3. Try asking: "Tell me about Moksh's experience at Meta"

## 🔍 Troubleshooting

### If search still doesn't work:

1. **Check Netlify Function Logs**:
   - Go to Netlify dashboard → **Functions** tab
   - Look for any error messages in the `api` function

2. **Test API Endpoint Directly**:
   ```bash
   curl -X POST https://your-site.netlify.app/.netlify/functions/api \
     -H "Content-Type: application/json" \
     -d '{"question":"Tell me about Moksh"}'
   ```

3. **Common Issues**:
   - **Invalid API Key**: Make sure the key starts with `sk-`
   - **Quota Exceeded**: Check your OpenAI billing
   - **CORS Issues**: The function should handle CORS automatically

### 4. Local Development
For local testing:
1. Create `.env` file in root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
2. Run: `npm start`
3. Test at: `http://localhost:3001`

## 📝 What Was Fixed

1. **API Parameter Mismatch**: Changed `message` to `question` in the Netlify function
2. **Enhanced Error Handling**: Better error messages for debugging
3. **Improved System Prompt**: More comprehensive portfolio data
4. **Environment Variable Check**: Added validation for missing API key

## 🎯 Expected Behavior

After fixing:
- ✅ Search input accepts questions
- ✅ AI responds with relevant information
- ✅ Loading states work properly
- ✅ Error handling for API issues
- ✅ Mobile-responsive design maintained

## 📞 Support

If issues persist:
1. Check Netlify function logs
2. Verify OpenAI API key is valid
3. Ensure sufficient OpenAI credits
4. Test with simple queries first

---

**Note**: The search functionality uses predefined responses for common queries and OpenAI for complex questions. This provides fast responses while maintaining AI capabilities for detailed questions. 