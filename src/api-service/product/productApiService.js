export const getProducerProductById = (productId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/${productId}?withSku=true`,
    token: token,
  };
  return { ...apiObj };
};

export const postAddProduct = (productObj) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product`,
    body: productObj,
    token: token,
  };
  return { ...apiObj };
};

export const getVariants = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/variant`,
    token: token,
  };
  return { ...apiObj };
};

export const putUpdateSku = (skuId, externalID, price, quantity, options) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/sku/${skuId}`,
    body: {
      externalID: externalID,
      price: price,
      quantity: quantity,
      options: options,
    },
    token: token,
  };
  return { ...apiObj };
};

export const postAddSkuToProduct = (productId, sku) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/${productId}/sku`,
    body: {
      skus: [{ ...sku }],
    },
    token: token,
  };
  return { ...apiObj };
};

export const deleteRemoveSku = (skuId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/sku/${skuId}`,
    token: token,
  };
  return { ...apiObj };
};

export const putUpdateProduct = (productId, productObj) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/${productId}`,
    body: productObj,
    token: token,
  };
  return { ...apiObj };
};
