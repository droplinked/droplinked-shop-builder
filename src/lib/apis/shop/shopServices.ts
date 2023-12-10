import axiosInstance from "../axiosConfig"
import { IchargeCreditService, IpaymentCreateService, IproductService, IrecordedShopService, IshopInfoService, IshopPublicRecordedService, IShopRecordedService, IshopService, IshopUpdateService } from "./interfaces"

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

export const shopPublicRecordedService = ({ page, tags }: IshopPublicRecordedService) => {
    return axiosInstance.get(`shop/public/recorded?limit=10&page=${page}${tags ? '&tags=' + `["${tags}"]` : ''}`)
}

export const recordedShopService = ({ shopName }: IrecordedShopService) => {
    return axiosInstance.get(`shop/public/recorded/${shopName}`)
}

export const productService = ({ productID }: IproductService) => {
    return axiosInstance.get(`product/${productID}`)
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

export const ShopRecordedService = ({ categoryIds, page, subCategoryIds, title }: IShopRecordedService) => {
    return axiosInstance.get(`product/community/recorded?limit=25&page=${page}${categoryIds ? '&categoryIds=' + `["${categoryIds}"]` : ''}${subCategoryIds ? '&subCategoryIds=' + `["${subCategoryIds}"]` : ''}${title ? '&title=' + title : ''}`)
}

export const chargeCreditService = (props: IchargeCreditService) => {
    return axiosInstance.post(`shop/credit/charge`, props)
}

export const patchedChargedService = () => {
    return axiosInstance.patch(`shop/credit/charge`)
}

export const shopDashboardService = () => {
    return axiosInstance.get(`shop/dashboard/products?limit=5`)
}

export const shopSellerService = () => {
    return axiosInstance.get(`shop/dashboard/sellers?limit=5`)
}