import axiosInstance from "../axiosConfig"
import { IordersServices } from "./interfaces"

export const ordersServices = ({ page }: IordersServices) => {
    return axiosInstance.get(`order?page=${page || 1}`)
}