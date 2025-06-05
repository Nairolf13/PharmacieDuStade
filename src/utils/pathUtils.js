export const getAssetPath = (relativePath) => {
  // En développement, utilise des chemins relatifs
  // En production, utilise le base path de Vite
  const basePath = import.meta.env.DEV ? './' : '/PharmacieDuStade/';
  return `${basePath}${relativePath}`;
};

export const getImagePath = (imageName) => {
  return getAssetPath(`assets/imgs/${imageName}`);
};

export const getLogoPath = () => {
  return getImagePath('LogoPharma.png');
};
