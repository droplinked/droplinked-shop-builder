import axiosInstance from "../axiosConfig"

export const ordersServices = () => {
    return axiosInstance.get("order")
}