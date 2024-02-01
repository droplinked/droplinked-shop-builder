import axiosInstance from "../axiosConfig"
import { IbestProducts, IgetRevenueServices } from "./interfaces"

export const getRevenueServices = ({ dateRange, from, to }: IgetRevenueServices) => {
    return axiosInstance.get(`shop/dashboard/revenue?from=${from.toISOString()}&to=${to.toISOString()}&dateRange=${dateRange}`)
}

export const getBestSelledProducts = ({ from, to }: IbestProducts) => {
    return axiosInstance.get(`shop/dashboard/products?from=${from.toISOString()}&to=${to.toISOString()}&limit=5`)
}