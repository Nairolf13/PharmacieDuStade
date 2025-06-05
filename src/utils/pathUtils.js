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

export const getBDPMPath = () => {
  return getAssetPath('bdpm.csv');
};

export const getCompositionsPath = () => {
  return getAssetPath('compositions.txt');
};

export const getPresentationsPath = () => {
  return getAssetPath('presentations.txt');
};

export const getSMRPath = () => {
  return getAssetPath('smr.txt');
};
