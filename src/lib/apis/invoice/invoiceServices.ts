import axiosInstance from "../axiosConfig";
import { CartAdditionalDetails, InvoiceQueryParams } from "./interfaces";

const endpoint = "cart/producer/invoices"

export const createInvoiceService = () => axiosInstance.post(endpoint).then(res => res.data)

export const addProductToInvoiceService = (invoiceId: string, products: any[]) =>
    axiosInstance.post(`${endpoint}/${invoiceId}/products`, { products }).then(res => res.data)

export const removeProductFromCartService = (cartId: string, itemId: string) =>
    axiosInstance.delete(`cart/v2/public/anonymous-cart/${cartId}`, { data: { itemId } })

export const createAddressService = (address: any) =>
    axiosInstance.post("address-book/public/anonymous-customer", address).then(res => res.data)

export const addAddressToCartService = (cartId: string, addressBookID: string) =>
    axiosInstance.post(`checkout/v2/public/anonymous-cart/${cartId}/address`, { addressBookID, note: "" }).then(res => res.data)

export const addAdditionalDetailsToCartService = (cartId: string, details: CartAdditionalDetails) =>
    axiosInstance.patch(`checkout/anon/${cartId}/additional-details`, { ...details }).then(res => res.data)

export const addGiftCardToCartService = (cartId: string, giftCardCode: string) =>
    axiosInstance.patch(`giftcard/public/apply/${giftCardCode}/${cartId}`).then(res => res.data)

export const getInvoicesService = (params: InvoiceQueryParams) => {
    const queryParams = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            if (value) acc[key] = String(value)
            return acc
        }, {} as Record<string, string>)
    ).toString()

    return axiosInstance.get(`${endpoint}?${queryParams}`).then(res => res.data)
}

export const retrieveInvoiceByIdService = (invoiceId: string) => axiosInstance.get(`cart/v2/public/anonymous-cart/${invoiceId}`).then(res => res.data)

export const deleteInvoiceService = (invoiceId: string) => axiosInstance.delete(`${endpoint}/${invoiceId}`)