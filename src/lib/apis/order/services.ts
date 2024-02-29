import axiosInstance from "../axiosConfig";
import { IcrateSampleService, IgetOrderService } from "./interfaces";

export const getOrderService = ({ orderID }: IgetOrderService) => {
    return axiosInstance.get(`order/single/${orderID}`)
}

export const createSampleService = (data: IcrateSampleService) => {
    return axiosInstance.post(`order/sample/order`, data)
}
