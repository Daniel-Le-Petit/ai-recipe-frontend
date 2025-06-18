# Arrêt du serveur de développement 
npm cache clean --force

rm -rf node_modules
rm package-lock.json # ou yarn.lock si vous utilisez Yarn

npm install
#
# Relancez le serveur de développement sous une fenetre Powershell:
npm run dev
