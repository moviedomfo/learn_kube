@echo on
@rem Importador de toma estados
cd d:\releases\rapi\member-api\
  pm2 start ecosystem.config.js
pause