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

export const getOrderClientSecret = (orderId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `order/${orderId}/client-secret`,
    token: token,
  };
  return { ...apiObj };
};


export const postCancelOrder = (orderId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `order/${orderId}/cancel-payment`,
    token: token,
  };
  return { ...apiObj };
};


export const getProducerOrder = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/order`,
    token: token,
  };
  return { ...apiObj };
};

