export const getIntroData = (product) => {
  return {
    title: product.title,
    description: product.description,
    media: product.media.map((img) => img.url),
  };
};

export const getTechnicalData = (product) => {
  return {
    productCollectionID: product.productCollectionID,
    shippingType: product.shippingType,
    shippingPrice: product.shippingPrice,
  };
};
