import axiosInstance from "../axiosConfig";
import { IgetOrderService } from "./interfaces";

export const getOrderService = ({ orderID }: IgetOrderService) => {
    return axiosInstance.get(`order/single/${orderID}`)
}
