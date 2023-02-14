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

export const getPropertiesData = (product) => {
  let currentOption = [];
  product.skus[0].options.forEach((option, i) => {
    currentOption.push({
      optionId: option.variantID,
      optionName: option.variantName,
      values: [],
      index: i + 1,
    });
  });

  currentOption.forEach((option) => {
    option.values = product.skus.map((sku, i) => {
      return {
        index: i + 1,
        value: sku.options.find((opt) => opt.variantID == option.optionId)
          .value,
      };
    });
  });
  return currentOption;
};
