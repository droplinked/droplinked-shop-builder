import axiosInstance from "../axiosConfig";
import { InvoiceQueryParams } from "./interfaces";

const endpoint = "cart/producer/invoices"

export const getInvoicesService = (params: InvoiceQueryParams) => {
    const queryParams = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) acc[key] = String(value)
            return acc
        }, {} as Record<string, string>)
    ).toString()

    return axiosInstance.get(`${endpoint}?${queryParams}`).then(res => res.data)
}