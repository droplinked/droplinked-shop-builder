


export const getShopInfoByShopname = (shopname) => {
  let apiObj = {
    url: `shopinfo/${shopname}`,
  };
  return { ...apiObj };
};

