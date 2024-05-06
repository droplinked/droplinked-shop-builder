import axiosInstance from "../axiosConfig";

export const getCustomShippingsService = () => axiosInstance.get("shippings")

export const createCustomShippingService = (data: any) => axiosInstance.post("shippings", data)

export const deleteCustomShippingService = (id: string) => axiosInstance.delete(`shippings/${id}`)