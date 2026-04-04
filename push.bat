@echo off
cd /d "C:\Users\Richard\Desktop\Proyecto Moviles 01"
set GIT_EDITOR=cat
set GIT_SEQUENCE_EDITOR=cat
git push origin main --force
echo Push completado
pause
