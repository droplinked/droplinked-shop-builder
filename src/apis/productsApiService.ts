import { createApiReq } from "./api-utils";

export const postProduct = (body: any) => {
  return createApiReq(`product`, true, body);
};

export const getProduct = () => {
  return createApiReq(`product`, true, null);
};

export const getProductById = (productId: number) => {
  return createApiReq(`product/${productId}`, true, null);
};

export const deleteProductById = (productId: number) => {
  return createApiReq(`product/${productId}`, true, null);
};

export const putProductById = (productId: number, body: any) => {
  return createApiReq(`product/${productId}`, true, body);
};

export const getPublicProductById = (productId: number) => {
  return createApiReq(`product/public/${productId}`, false, null);
};

export const postImportShopify = () => {
  return createApiReq(`product/import`, true, null);
};
