import { createQueryString } from "../_utils/with.query";
import axiosInstance from "../axiosConfig";
import { CartAdditionalDetails, CartShippingMethod, DeleteInvoiceProduct, InvoiceQueryParams } from "./interfaces";

const endpoint = "cart/producer/invoices"

export const createInvoiceService = () => axiosInstance.post(endpoint).then(res => res.data)

export const addProductToInvoiceService = (invoiceId: string, products: any[]) =>
    axiosInstance.post(`${endpoint}/${invoiceId}/products`, { products }).then(res => res.data)

export const removeProductFromCartService = ({ cartId, itemId }: DeleteInvoiceProduct) =>
    axiosInstance.delete(`cart/v2/public/anonymous-cart/${cartId}`, { data: { itemId } }).then(res => res.data)

export const createAddressService = (address: any) =>
    axiosInstance.post("address-book/public/anonymous-customer", address).then(res => res.data)

export const addAddressToCartService = (cartId: string, addressBookID: string) =>
    axiosInstance.post(`checkout/v2/public/anonymous-cart/${cartId}/address`, { addressBookID, note: "" }).then(res => res.data)

export const addAdditionalDetailsToCartService = (cartId: string, details: CartAdditionalDetails) =>
    axiosInstance.patch(`checkout/anon/${cartId}/additional-details`, { ...details }).then(res => res.data)

export const addGiftCardToCartService = (cartId: string, giftCardCode: string) =>
    axiosInstance.patch(`giftcard/public/apply/${giftCardCode}/${cartId}`).then(res => res.data)

export const addShippingMethodToCartService = (cartId: string, shippingMethod: CartShippingMethod) =>
    axiosInstance.post(`checkout/v2/public/anonymous-cart/${cartId}/shipping-rate`, { rates: [shippingMethod] }).then(res => res.data)

export const getInvoicesService = (params: InvoiceQueryParams) => {
    const queryString = createQueryString(params).toString();
    return axiosInstance.get(`${endpoint}?${queryString}`).then(res => res.data)
}

export const retrieveInvoiceByIdService = (invoiceId: string) => axiosInstance.get(`cart/v2/public/anonymous-cart/${invoiceId}`).then(res => res.data)

export const deleteInvoiceService = (invoiceId: string) => axiosInstance.delete(`${endpoint}/${invoiceId}`)