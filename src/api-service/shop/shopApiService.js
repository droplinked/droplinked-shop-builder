export const getShopInformationByName = (shopName) => {
  let apiObj = {
    url: `shop/public/${shopName}`,
  };
  return { ...apiObj };
};


