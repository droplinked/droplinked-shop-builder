import axiosInstance from "lib/axiosConfig";
import { IcrateSampleService, IgetOrderResponse, IgetOrderService, IGetProductOrdersService, IupdateSampleService } from "./interfaces";

export const getOrderService = ({ orderID }: IgetOrderService) => {
    return axiosInstance.get<IgetOrderResponse>(`order/single/${orderID}`)
}

export const createSampleService = (data: IcrateSampleService) => {
    return axiosInstance.post(`order/sample/order`, data)
}

export const updateSampleService = (data: IupdateSampleService) => {
    return axiosInstance.put(`order/sample/order`, data)
}

export const cancelSampleService = () => {
    return axiosInstance.delete("order/sample/order")
}

export const exportOrdersReportService = () => {
    return axiosInstance.get("order/report/export/excel", { responseType: "blob" }).then(res => res.data)
}

export const getProductOrdersService = ({ productId }: IGetProductOrdersService) => {
    return axiosInstance.get(`order/product/${productId}`)
}

