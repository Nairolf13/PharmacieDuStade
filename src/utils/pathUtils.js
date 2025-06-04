// Utilitaire pour gérer les chemins d'assets en local et sur GitHub Pages
export const getAssetPath = (relativePath) => {
  // Détection de l'environnement GitHub Pages
  if (window.location.hostname === 'nairolf13.github.io') {
    // Sur GitHub Pages, utiliser le chemin avec le nom du repo
    return `/PharmacieDuStade/${relativePath}`;
  }
  
  // En local ou autres environnements, utiliser le chemin relatif
  return `./${relativePath}`;
};

// Helper spécifique pour les images
export const getImagePath = (imageName) => {
  return getAssetPath(`assets/imgs/${imageName}`);
};

// Helper pour le logo spécifiquement
export const getLogoPath = () => {
  return getImagePath('LogoPharma.png');
};
