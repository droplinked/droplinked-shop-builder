import axiosInstance from "../axiosConfig"
import { IGiftCardExpiryDate, IgiftcardCreateService, IgiftcardsService } from "./interfaces"

export const giftcardCreateService = (params: IgiftcardCreateService) => {
    return axiosInstance.post(`giftcard/create`, params)
}

export const updateGiftCartExpiryDateService = ({ id, expiryDate }: IGiftCardExpiryDate) => {
    return axiosInstance.patch(`giftcard/expire/${id}`, { expiryDate })
}

export const giftcardsService = ({ limit, page, search }: IgiftcardsService) => {
    return axiosInstance.get(`giftcard?page=${page || 1}&limit=${limit || 20}${search ? `&search=${search}` : ''}`)
}