# Property Research Tool — Setup Guide

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | The webpage frontend |
| `api/token.js` | Vercel function — handles Domain.com.au OAuth (fixes CORS) |
| `api/proxy.js` | Vercel function — proxies all API calls |
| `vercel.json` | Vercel routing config |
| `package.json` | Node config for Vercel |

---

## Deploy to Vercel (free, ~5 minutes)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** icon → **New repository**
2. Name it `property-tool`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. Click **Add file** → **Upload files**
2. Upload ALL files in this folder, keeping the folder structure:
   - `index.html` (root)
   - `api/token.js` (inside an `api` folder)
   - `api/proxy.js` (inside the same `api` folder)
   - `vercel.json` (root)
   - `package.json` (root)
3. Click **Commit changes**

### Step 4 — Deploy to Vercel
1. Go to https://vercel.com and sign up with your GitHub account (free)
2. Click **Add New Project**
3. Select your `property-tool` repository
4. Leave all settings as default
5. Click **Deploy**

Your site will be live at: `https://property-tool.vercel.app` (or similar)

---

## Using the tool
1. Open your Vercel URL
2. Enter your Domain.com.au Client ID and Client Secret
3. Click **Connect**
4. Search listings, look up addresses, or get suburb insights

---

## Getting your Domain.com.au API keys
1. Go to https://developer.domain.com.au
2. Sign up for a free account
3. Go to **My Apps** → **Create New App**
4. Tick: Listings, Properties, Demographics/Insights
5. Copy your **Client ID** and **Client Secret**

---

## Notes
- The free Vercel plan is more than enough for personal use
- Domain.com.au free tier gives you ~500 API calls/day
- Suburb insights may require a higher API tier on Domain's end
- To run locally: install Node.js, then run `npx vercel dev` in this folder
