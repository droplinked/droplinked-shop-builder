export const getIntroData = (product) => {
  return {
    title: product.title,
    description: product.description,
    media: product.media.map((img) => img.url),
  };
};
