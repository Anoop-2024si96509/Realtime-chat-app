# Quick Deploy Script for Railway

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Railway Deployment Helper" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you deploy to Railway!" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 1: Push to GitHub" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
$gitPushed = Read-Host "Have you pushed your code to GitHub? (yes/no)"

if ($gitPushed -ne "yes") {
    Write-Host ""
    Write-Host "Please push to GitHub first:" -ForegroundColor Red
    Write-Host "Run: .\push-to-github.ps1" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "✅ Great! Now let's deploy to Railway" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 2: Deploy to Railway" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host "1. Go to: https://railway.app" -ForegroundColor White
Write-Host "2. Click 'Login with GitHub'" -ForegroundColor White
Write-Host "3. Click 'New Project' → 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "4. Select your 'Realtime-chat-app' repository" -ForegroundColor White
Write-Host "5. Click 'Deploy Now'" -ForegroundColor White
Write-Host ""
$railwayDone = Read-Host "Have you created the project on Railway? (yes/no)"

if ($railwayDone -ne "yes") {
    Write-Host ""
    Write-Host "Please complete Railway setup first, then run this script again." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "STEP 3: Add Environment Variables to Railway" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host "In Railway dashboard:" -ForegroundColor White
Write-Host "1. Click on your service" -ForegroundColor White
Write-Host "2. Go to 'Variables' tab" -ForegroundColor White
Write-Host "3. Add these variables:" -ForegroundColor White
Write-Host ""
Write-Host "MONGODB_URI=mongodb+srv://2024si96509_db_user:OSNhOMP1KOuKBPpW@cluster0.6fdrypg.mongodb.net/realtime-chat?retryWrites=true&w=majority" -ForegroundColor Cyan
Write-Host "JWT_SECRET=your_super_secret_key_change_this" -ForegroundColor Cyan
Write-Host "NODE_ENV=production" -ForegroundColor Cyan
Write-Host "CLIENT_URL=https://your-frontend-url.vercel.app" -ForegroundColor Cyan
Write-Host "PORT=5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: We'll update CLIENT_URL after deploying frontend" -ForegroundColor Yellow
Write-Host ""
$varsAdded = Read-Host "Have you added the environment variables? (yes/no)"

if ($varsAdded -ne "yes") {
    Write-Host ""
    Write-Host "Please add the variables first." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "STEP 4: Get Your Backend URL" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host "1. In Railway, go to 'Settings' → 'Domains'" -ForegroundColor White
Write-Host "2. Click 'Generate Domain'" -ForegroundColor White
Write-Host "3. Copy your backend URL" -ForegroundColor White
Write-Host ""
$backendUrl = Read-Host "Paste your Railway backend URL here (e.g., https://your-app.up.railway.app)"

Write-Host ""
Write-Host "✅ Backend URL saved: $backendUrl" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 5: Deploy Frontend to Vercel" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com" -ForegroundColor White
Write-Host "2. Click 'Sign Up' → 'Continue with GitHub'" -ForegroundColor White
Write-Host "3. Click 'Add New...' → 'Project'" -ForegroundColor White
Write-Host "4. Select your 'Realtime-chat-app' repository" -ForegroundColor White
Write-Host "5. IMPORTANT: Set 'Root Directory' to 'client'" -ForegroundColor Red
Write-Host "6. Add Environment Variable:" -ForegroundColor White
Write-Host "   REACT_APP_SOCKET_URL=$backendUrl" -ForegroundColor Cyan
Write-Host "7. Click 'Deploy'" -ForegroundColor White
Write-Host ""
$vercelDone = Read-Host "Have you deployed to Vercel? (yes/no)"

if ($vercelDone -ne "yes") {
    Write-Host ""
    Write-Host "Please complete Vercel deployment." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
$frontendUrl = Read-Host "Paste your Vercel frontend URL here (e.g., https://realtime-chat-app.vercel.app)"

Write-Host ""
Write-Host "STEP 6: Update Backend with Frontend URL" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host "Go back to Railway and update CLIENT_URL variable to:" -ForegroundColor White
Write-Host "$frontendUrl" -ForegroundColor Cyan
Write-Host ""
$updated = Read-Host "Have you updated CLIENT_URL in Railway? (yes/no)"

if ($updated -eq "yes") {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Green
    Write-Host "  🎉 DEPLOYMENT COMPLETE! 🎉" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your app is now LIVE!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🌐 Frontend: $frontendUrl" -ForegroundColor Yellow
    Write-Host "🖥️  Backend: $backendUrl" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Share your app with the world! 🚀" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test it now: Open $frontendUrl in your browser" -ForegroundColor Cyan
    Write-Host ""
}

pause
