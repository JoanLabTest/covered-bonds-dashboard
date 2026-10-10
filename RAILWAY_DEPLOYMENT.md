# Railway Deployment Guide

## Quick Setup (5 minutes)

### 1. Create Railway Account
1. Go to https://railway.app/
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)

### 2. Deploy from GitHub
1. Click "Deploy from GitHub repo"
2. Select: `JoanLabTest/covered-bonds-dashboard`
3. Railway will auto-detect Python and deploy

### 3. Configuration
Railway auto-detects:
- ✅ Python runtime
- ✅ requirements.txt
- ✅ Procfile
- ✅ Port from environment

No manual configuration needed!

### 4. Get Your URL
After deployment (2-3 min):
1. Go to your project settings
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://your-app.up.railway.app`)

## API Endpoints

Once deployed, your APIs will be available at:

```
https://your-app.up.railway.app/api/market
https://your-app.up.railway.app/api/digital-bonds
https://your-app.up.railway.app/api/economic-calendar
```

## Testing

```bash
# Test all endpoints
curl https://your-app.up.railway.app/
curl https://your-app.up.railway.app/api/market
curl https://your-app.up.railway.app/api/digital-bonds
curl https://your-app.up.railway.app/api/economic-calendar
```

## Environment Variables (Optional)

If you want to add API keys later:
1. Go to project settings
2. Click "Variables"
3. Add: `ALPHA_VANTAGE_API_KEY=your_key`

## Monitoring

Railway provides:
- ✅ Deployment logs
- ✅ Runtime logs
- ✅ Metrics (CPU, Memory)
- ✅ Automatic HTTPS
- ✅ Auto-deploy on Git push

## Free Tier

- 500 hours/month
- $5 credit/month
- More than enough for this use case

## Troubleshooting

If deployment fails:
1. Check logs in Railway dashboard
2. Verify requirements.txt has all dependencies
3. Ensure Procfile is correct

## Next Steps

After Railway is deployed:
1. Update frontend API URLs
2. Test on GitHub Pages
3. Enjoy real-time data!
