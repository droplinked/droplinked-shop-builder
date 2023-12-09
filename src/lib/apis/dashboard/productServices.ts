import axiosInstance from "../axiosConfig"
import { } from "./interfaces"

export const getRevenueServices = () => {
    return axiosInstance.get(`shop/dashboard/revenue`)
}