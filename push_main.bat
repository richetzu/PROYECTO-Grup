@echo off
chcp 65001 >nul
cd /d "C:\Users\Richard\Desktop\Proyecto Moviles 01"

echo ========================================
echo Verificando remote configurado...
echo ========================================
git remote -v

echo.
echo ========================================
echo Agregando todos los cambios...
echo ========================================
git add .

echo.
echo ========================================
echo Haciendo commit con mensaje "Subiendo proyecto completo"...
echo ========================================
git commit -m "Subiendo proyecto completo"

echo.
echo ========================================
echo Haciendo push a rama main...
echo ========================================
git push origin main --force

echo.
echo ========================================
echo ¡Push completado!
echo ========================================
echo.
echo Verifica tu repositorio en:
echo https://github.com/MichaelArteaga-urey/APLICACIONES-WEB
echo.
pause
