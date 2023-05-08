import axiosInstance from "../axiosConfig"
import { IpaymentCreateService, IshopService } from "./interfaces"

export const shopService = ({ shopName }: IshopService) => {
    return axiosInstance.get(`shop/${shopName}`)
}

export const paymentPublicService = async () => {
    return axiosInstance.get(`shop/public/available-payment-methods`)
}

export const paymentMethodsService = () => {
    return axiosInstance.get(`shop/payment-methods`)
}

export const paymentCreateService = (params: Array<IpaymentCreateService>) => {
    return axiosInstance.post(`shop/payment-methods`,{
        methods: params
    })
}