#!/bin/bash

# Script de déploiement propre pour GitHub Pages

echo "🧹 Nettoyage et reconstruction..."
rm -rf dist
npm run build

echo "🗑️ Suppression de l'ancienne branche gh-pages..."
git push origin --delete gh-pages 2>/dev/null || echo "Branche gh-pages n'existait pas"
git branch -D gh-pages 2>/dev/null || echo "Branche locale gh-pages n'existait pas"

echo "📦 Déploiement propre vers GitHub Pages..."
npx gh-pages -d dist

echo "✅ Déploiement terminé !"
echo "🌐 Votre site sera disponible sur: https://nairolf13.github.io/PharmacieDuStade/"
echo "⏰ Attendez quelques minutes pour la propagation..."
