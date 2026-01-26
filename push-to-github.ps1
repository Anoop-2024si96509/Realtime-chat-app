# Push to GitHub Script
# Run this script after creating your GitHub repository

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  GitHub Push Helper Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Get repository name (default: Realtime-chat-app)
$repoName = Read-Host "Enter repository name (press Enter for 'Realtime-chat-app')"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "Realtime-chat-app"
}

Write-Host ""
Write-Host "Repository URL will be: https://github.com/$username/$repoName" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Have you created this repository on GitHub? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host ""
    Write-Host "Please create the repository on GitHub first:" -ForegroundColor Red
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Repository name: $repoName" -ForegroundColor Yellow
    Write-Host "3. Make it PUBLIC (for open source)" -ForegroundColor Yellow
    Write-Host "4. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
    Write-Host "5. Click 'Create repository'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run this script again after creating the repository." -ForegroundColor Cyan
    pause
    exit
}

Write-Host ""
Write-Host "Setting up remote repository..." -ForegroundColor Green

# Add remote
$remoteUrl = "https://github.com/$username/$repoName.git"
git remote add origin $remoteUrl

# Verify remote
Write-Host ""
Write-Host "Remote repository configured:" -ForegroundColor Green
git remote -v

# Rename branch to main
Write-Host ""
Write-Host "Renaming branch to 'main'..." -ForegroundColor Green
git branch -M main

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Green
    Write-Host "  SUCCESS! 🎉" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository is now live at:" -ForegroundColor Cyan
    Write-Host "https://github.com/$username/$repoName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Add topics/tags on GitHub (chat, realtime, socketio, mern, etc.)" -ForegroundColor White
    Write-Host "2. Add a description to your repository" -ForegroundColor White
    Write-Host "3. Share your project!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Push failed! Common issues:" -ForegroundColor Red
    Write-Host "1. Repository doesn't exist on GitHub" -ForegroundColor Yellow
    Write-Host "2. Authentication failed (need to set up Git credentials)" -ForegroundColor Yellow
    Write-Host "3. Remote already exists (run: git remote remove origin)" -ForegroundColor Yellow
    Write-Host ""
}

pause
