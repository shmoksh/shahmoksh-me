# Deployment Guide — Google Gemini API

## Overview
The portfolio chat uses Google Gemini (`gemini-2.5-flash`) via the `@google/generative-ai` SDK. The backend has a strict server-side guardrail: it only answers questions about Moksh; anything else returns a fixed off-topic message.

## 1. Get a Gemini API key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in and click **Create API key**
3. Copy the key

## 2. Configure Netlify environment variable (production)

### Option A: Netlify dashboard
1. Open your site at https://app.netlify.com/teams/shmoksh/projects
2. Go to **Site settings** → **Environment variables**
3. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: your Gemini key
4. Save, then **trigger a redeploy** (Deploys → Trigger deploy → Clear cache and deploy site)

### Option B: Netlify CLI
```bash
netlify env:set GEMINI_API_KEY "your_gemini_key"
netlify deploy --prod
```

> Important: if you previously set `OPENAI_API_KEY` in Netlify, you can delete it — it is no longer used.

## 3. Local development
```bash
cp .env.example .env
# edit .env and paste your Gemini key into GEMINI_API_KEY
npm install
npm start
# open http://localhost:3001
```

The `.env` file is gitignored — never commit it. Only `.env.example` (a template with no secret) is tracked.

## 4. Verify production
```bash
curl -X POST https://<your-site>.netlify.app/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Tell me about Moksh'\''s experience at Meta"}'
```
Expected: a JSON `{ "response": "..." }` with Moksh-specific content.

Try an off-topic question to confirm the guardrail:
```bash
curl -X POST https://<your-site>.netlify.app/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is the capital of France?"}'
```
Expected: the fixed off-topic message, not a real answer.

## Troubleshooting
- **500 "Gemini API key not configured"** — env var missing in Netlify; add `GEMINI_API_KEY` and redeploy.
- **500 "Invalid Gemini API key"** — key typo or revoked; regenerate in AI Studio.
- **Function logs** — Netlify dashboard → Functions → `api`.
