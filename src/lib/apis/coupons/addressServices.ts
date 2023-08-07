import axiosInstance from "../axiosConfig"
import { IgiftcardCreateService } from "./interfaces"

export const giftcardCreateService = (params: IgiftcardCreateService) => {
    return axiosInstance.post(`giftcard/create`, params)
}