@echo on
@rem Importador de toma estados
cd d:\releases\rapi\boleteria-vip-daemon\
  pm2 start ecosystem.config.js
pause