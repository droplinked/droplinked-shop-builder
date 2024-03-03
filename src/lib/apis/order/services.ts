import axiosInstance from "../axiosConfig";
import { IcrateSampleService, IgetOrderService, IupdateSampleService } from "./interfaces";

export const getOrderService = ({ orderID }: IgetOrderService) => {
    return axiosInstance.get(`order/single/${orderID}`)
}

export const createSampleService = (data: IcrateSampleService) => {
    return axiosInstance.post(`order/sample/order`, data)
}

export const updateSampleService = (data: IupdateSampleService) => {
    return axiosInstance.put(`order/sample/order`, data)
}
