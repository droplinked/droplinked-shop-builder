import { createApiReq } from "./api-utils";

export const putUpdateShop = (body: any) => {
  return createApiReq(`shop`, true, body);
};

export const getIsShopExist = (shopName: string) => {
  return createApiReq( `shop/${shopName}`, false, null);
};

export const getShopPublic = (shopName: string) => {
  return createApiReq( `shop/public/${shopName}`, false, null);
};

export const getShopInfo = (shopName: string) => {
  return createApiReq( `shop/shopInfo/${shopName}`, true, null);
};
