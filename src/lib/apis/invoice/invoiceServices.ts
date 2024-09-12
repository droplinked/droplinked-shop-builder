import axiosInstance from "../axiosConfig";
import { InvoiceQueryParams } from "./interfaces";

const endpoint = "cart/producer/invoices"

export const createInvoiceService = () => axiosInstance.post(endpoint).then(res => res.data)

export const addProductToInvoiceService = (invoiceId: string, products: any[]) =>
    axiosInstance.post(`${endpoint}/${invoiceId}/products`, { products }).then(res => res.data)

export const getInvoicesService = (params: InvoiceQueryParams) => {
    const queryParams = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            if (value) acc[key] = String(value)
            return acc
        }, {} as Record<string, string>)
    ).toString()

    return axiosInstance.get(`${endpoint}?${queryParams}`).then(res => res.data)
}

export const deleteInvoiceService = (invoiceId: string) => axiosInstance.delete(`${endpoint}/${invoiceId}`)