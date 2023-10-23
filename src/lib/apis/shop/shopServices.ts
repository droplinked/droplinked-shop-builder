import axiosInstance from "../axiosConfig"
import { IpaymentCreateService, IproductService, IrecordedShopService, IshopInfoService, IshopService, IshopUpdateService } from "./interfaces"

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
    return axiosInstance.get(`product/${productID}?recorded=true`)
}

export const shopInfoService = ({ shopName }: IshopInfoService) => {
    return axiosInstance.get(`shop/shopInfo/${shopName}`)
}

export const shopUpdateService = (params: IshopUpdateService) => {
    return axiosInstance.put(`shop`, params)
}

export const availableTemplateService = () => {
    return axiosInstance.get(`shop/available/templates`)
}

export const ShopRecordedService = () => {
    return axiosInstance.get(`shop/public/recorded`)
}