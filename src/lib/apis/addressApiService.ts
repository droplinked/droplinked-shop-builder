import { createApiReq } from "./api-utils";

export const postCreateAddress = (body: any) => {
  return createApiReq( `address-book` , true , body)
};

export const getAddressList = () => {
  return createApiReq( `address-book` , true , null)
};

export const deleteAddress = (addressId: number) => {
  return createApiReq( `address-book/${addressId}` , true , null)
};

export const getAddressById = (addressId: number) => {
  return createApiReq( `address-book/${addressId}` , true , null)
};

export const putUpdateAddress = (addressId: number, body: any) => {
  return createApiReq( `address-book/${addressId}` , true , body)
};
