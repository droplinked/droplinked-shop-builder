import axiosInstance from "lib/axiosConfig"

export const getCustomShippingsService = () => axiosInstance.get("shippings")

export const createCustomShippingService = (data: any) => axiosInstance.post("shippings", data)