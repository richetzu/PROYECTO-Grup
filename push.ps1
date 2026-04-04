$env:GIT_PAGER = 'cat'
$env:GIT_EDITOR = 'cat'
$ErrorActionPreference = 'Continue'

cd "C:\Users\Richard\Desktop\Proyecto Moviles 01"

Write-Host "Verificando remote..."
git remote -v

Write-Host "Haciendo push a main..."
& git push origin main --force 2>&1 | Write-Host

Write-Host "Push completado!"
