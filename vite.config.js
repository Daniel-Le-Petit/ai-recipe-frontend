import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Active le plugin React pour la compilation
  
  build: {
    // Cible pour une meilleure compatibilité avec les navigateurs plus anciens, comme Safari sur iOS
    // 'es2018' est un bon équilibre entre compatibilité et performance
    target: 'es2018', 
    outDir: '../dist', // Vérifiez que ce chemin correspond à votre configuration de déploiement sur Render
  },

  // Section optimizeDeps : utile pour le pré-bundling des dépendances,
  // et s'assure que les fichiers .js sont traités comme du JSX si nécessaire.
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Indique à esbuild de traiter les fichiers .js comme du JSX
      },
    },
  },
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1338', // L'adresse et le port de votre backend Strapi
        changeOrigin: true, // Nécessaire pour les requêtes de proxy
	    port: 5173, // Assurez-vous que le port est 5173 ou celui que vous utilisez
      },
    },
  },
});
