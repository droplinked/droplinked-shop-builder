import axiosInstance from "../axiosConfig"
import { IbestProducts, IClarityData, IgetRevenueServices } from "./interfaces"

export const getRevenueServices = ({ dateRange, from, to }: IgetRevenueServices) => {
    return axiosInstance.get(`shop/dashboard/revenue?from=${from.toISOString()}&to=${to.toISOString()}&dateRange=${dateRange}`)
}

export const getBestSelledProducts = ({ from, to }: IbestProducts) => {
    return axiosInstance.get(`shop/dashboard/products?from=${from.toISOString()}&to=${to.toISOString()}&limit=5`)
}

export const getClarityDataService = () => {
    return axiosInstance.get<IClarityData>("clarity/shop-info")
}