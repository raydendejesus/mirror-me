@echo off
cd /d "%~dp0"
start "Mirror Me Server" cmd /k node serve.js
timeout /t 2 /nobreak >nul
start "" http://localhost:8787/
