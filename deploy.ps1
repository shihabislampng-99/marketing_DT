# Coolify Deployment Script
$config = Get-Content ".coolify.json" | ConvertFrom-Json
$baseUrl = $config.api_url
$token = $config.api_token
$apps = $config.apps

$headers = @{
    "Authorization" = "Bearer $token"
    "Accept"        = "application/json"
}

function Deploy-App($app) {
    Write-Host "🚀 Triggering deployment for $($app.name) ($($app.uuid))..." -ForegroundColor Cyan
    try {
        $uri = "$baseUrl/deploy?uuid=$($app.uuid)"
        $response = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
        Write-Host "✅ Deployment triggered successfully! Deployment ID: $($response.id)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error triggering deployment: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Deploy both
Deploy-App $apps.backend
Deploy-App $apps.frontend

Write-Host "`n✨ All deployments triggered. Check Coolify dashboard for status." -ForegroundColor Yellow
