import axiosInstance from "../axiosConfig"
import { IpaymentCreateService, IproductService, IrecordedShopService, IshopService } from "./interfaces"

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
    return axiosInstance.post(`shop/payment-methods`, {
        methods: params
    })
}

export const shopPublicRecordedService = () => {
    return axiosInstance.get(`shop/public/recorded`)
}

export const recordedShopService = ({ shopName }: IrecordedShopService) => {
    return axiosInstance.get(`shop/public/recorded/${shopName}`)
}

export const productService = ({ productID }: IproductService) => {
    return axiosInstance.get(`product/${productID}`)
}