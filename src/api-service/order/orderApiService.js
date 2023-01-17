export const getImsOrders = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  let apiObj = {
    url: `order`,
    token: token,
  };
  return { ...apiObj };
};

export const getshopifyOrders = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  let apiObj = {
    url: `order?shopify=true`,
    token: token,
  };
  return { ...apiObj };
};
