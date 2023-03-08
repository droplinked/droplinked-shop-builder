export const putUpdateShop = (body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `shop`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const getIsShopExist = (shopName: string) => {
  let apiObj = {
    url: `shop/${shopName}`,
  };
  return { ...apiObj };
};

export const getShopPublic = (shopName: string) => {
  let apiObj = {
    url: `shop/public/${shopName}`,
  };
  return { ...apiObj };
};

export const getShopInfo = (shopName: string) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `shop/public/${shopName}`,
    token: token,
  };
  return { ...apiObj };
};
