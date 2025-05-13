import axiosInstance from "../axiosConfig"
import { IordersServices } from "./interfaces"

export const ordersServices = ({ page, status }: IordersServices) => {
    return axiosInstance.get(`order?page=${page || 1}${status ? `&status=${status}` : ''}`)
}

export const cancelOrderById = (id: string) => {
    return axiosInstance.put(`order/${id}`, { status: "CANCELED" })
}

export const ordersStatuesServices = () => {
    return axiosInstance.get(`order/status`)
}