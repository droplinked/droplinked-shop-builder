import axiosInstance from "../axiosConfig"
import { IgiftcardCreateService, IgiftcardsService } from "./interfaces"

export const giftcardCreateService = (params: IgiftcardCreateService) => {
    return axiosInstance.post(`giftcard/create`, params)
}

export const giftcardsService = ({ limit, page, search }: IgiftcardsService) => {
    return axiosInstance.get(`giftcard?page=${page || 1}&limit=${limit || 20}${search ? `&search=${search}` : ''}`)
}