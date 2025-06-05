export const getAssetPath = (relativePath) => {
  return `./${relativePath}`;
};

export const getImagePath = (imageName) => {
  return getAssetPath(`assets/imgs/${imageName}`);
};

export const getLogoPath = () => {
  return getImagePath('LogoPharma.png');
};
