import { createApiReq } from "./api-utils";

export const postRecordCasper = (body: any) => {
  return createApiReq(`sku/record/casper`, true, body);
};

export const putRecordCasper = (body: any) => {
  return createApiReq(`sku/record/casper`, true, body);
};

export const getRecordedSkuCasper = (skuID: number) => {
  return createApiReq(`/sku/record/casper/${skuID}`, true, null);
};
