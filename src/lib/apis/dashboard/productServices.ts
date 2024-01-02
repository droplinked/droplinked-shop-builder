import axiosInstance from "../axiosConfig"
import { IgetRevenueServices } from "./interfaces"

export const getRevenueServices = ({ dateRange, from, to }: IgetRevenueServices) => {
    return axiosInstance.get(`shop/dashboard/revenue?dateRange=${dateRange}&from=${from.toISOString()}&to=${to.toISOString()}`)
}