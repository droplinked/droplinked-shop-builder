import axiosInstance from "../axiosConfig"
import { IgetRevenueServices } from "./interfaces"

export const getRevenueServices = ({ dateRange }: IgetRevenueServices) => {
    return axiosInstance.get(`shop/dashboard/revenue${dateRange ? '?dateRange=' + dateRange : ''}`)
}