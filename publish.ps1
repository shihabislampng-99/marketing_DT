#!/usr/bin/env pwsh

Write-Host "Building frontend..." -ForegroundColor Cyan
Set-Location -Path "metadesk-frontend"
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend build failed! Aborting." -ForegroundColor Red
    exit $LASTEXITCODE
}
Set-Location -Path ".."

Write-Host "Clearing old public files in backend..." -ForegroundColor Cyan
Remove-Item -Recurse -Force "metadesk-backend/public/*" -ErrorAction SilentlyContinue

Write-Host "Copying new build to backend/public..." -ForegroundColor Cyan
Copy-Item -Recurse "metadesk-frontend/dist/*" "metadesk-backend/public/"

Write-Host "Committing and pushing backend..." -ForegroundColor Cyan
Set-Location -Path "metadesk-backend"
git add public
git commit -m "chore: auto-publish updated frontend to public dir"
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to push backend!" -ForegroundColor Red
    exit $LASTEXITCODE
}
Set-Location -Path ".."

Write-Host "Done! Frontend has been built and pushed to the backend repository." -ForegroundColor Green
Write-Host "Go to Coolify and click Deploy on your backend to see changes live." -ForegroundColor Yellow
