#!/bin/bash

echo "=== DIAGNOSTIC GITHUB PAGES ==="
echo "Date: $(date)"
echo

echo "1. Configuration du repository:"
echo "Repository name: $(basename $(git config --get remote.origin.url) .git)"
echo "Remote URL: $(git config --get remote.origin.url)"
echo

echo "2. Vérification de la configuration Vite:"
grep -A 5 -B 5 "repoName" vite.config.js || echo "Configuration non trouvée"
echo

echo "3. État des branches:"
git branch -a
echo

echo "4. Derniers commits sur gh-pages:"
git checkout gh-pages 2>/dev/null
git log --oneline -3
echo

echo "5. Fichiers sur gh-pages:"
ls -la
echo

echo "6. Contenu de index.html:"
head -15 index.html
echo

echo "7. Fichiers assets:"
ls -la assets/ 2>/dev/null || echo "Dossier assets non trouvé"
echo

echo "8. Test des URLs GitHub Pages:"
REPO_NAME=$(basename $(git config --get remote.origin.url) .git)
USER_NAME=$(git config --get remote.origin.url | cut -d'/' -f4)
BASE_URL="https://${USER_NAME}.github.io/${REPO_NAME}"

echo "URL de base: $BASE_URL"
echo "Test de connectivité:"
curl -I "$BASE_URL" 2>/dev/null | head -1 || echo "Impossible de connecter"

git checkout main 2>/dev/null
echo
echo "=== FIN DU DIAGNOSTIC ==="
