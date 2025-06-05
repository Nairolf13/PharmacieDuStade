// Utilitaire pour gérer les chemins d'assets avec Vite
// Vite gère automatiquement le base path défini dans vite.config.js
export const getAssetPath = (relativePath) => {
  // Utiliser les chemins relatifs - Vite s'occupe du base path automatiquement
  return `/${relativePath}`;
};

// Helper spécifique pour les images
export const getImagePath = (imageName) => {
  return getAssetPath(`assets/imgs/${imageName}`);
};

// Helper pour le logo spécifiquement
export const getLogoPath = () => {
  return getImagePath('LogoPharma.png');
};
