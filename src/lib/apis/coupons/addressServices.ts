import axiosInstance from "../axiosConfig"
import { IGiftCardExpiryDate, IexportCouponsReport, IgiftcardCreateService, IgiftcardsService } from "./interfaces"

export const giftcardCreateService = (params: IgiftcardCreateService) => {
    return axiosInstance.post(`giftcard/create`, params)
}

export const updateGiftCartExpiryDateService = ({ id, expiryDate }: IGiftCardExpiryDate) => {
    return axiosInstance.patch(`giftcard/expire/${id}`, { expiryDate })
}

export const giftcardsService = ({ limit, page, search }: IgiftcardsService) => {
    return axiosInstance.get(`giftcard?page=${page || 1}&limit=${limit || 20}${search ? `&search=${search}` : ''}`)
}

export const exportCouponsReport = ({ giftCardId }: IexportCouponsReport) => {
    return axiosInstance.get(`/giftcard/${giftCardId}/report/export/excel`, { responseType: "blob" }).then(res => res.data)
}