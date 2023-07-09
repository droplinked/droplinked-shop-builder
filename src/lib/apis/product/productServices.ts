import axiosInstance from "../axiosConfig"
import { IproductByIdServices, IproductDeleteServices, IproductList, IproductState, IproductUpdateServices, IskuUpdateByIdServices } from "./interfaces"

export const productServices = ({ page, limit, filter }: IproductList) => {
    return axiosInstance.get(`product?page=${page}&limit=${limit}${filter ? `&filter=${filter}`: ''}`)
}

export const productCreateServices = (params: IproductState) => {
    return axiosInstance.post("product", params)
}

export const productUpdateServices = ({ productID, params }: IproductUpdateServices) => {
    return axiosInstance.put(`product/${productID}`, params)
}

export const productDeleteServices = ({ productID }: IproductDeleteServices) => {
    return axiosInstance.delete(`product/${productID}`)
}

export const productByIdServices = ({ productID, shopname }: IproductByIdServices) => {
    return axiosInstance.get(`product/public/${productID}?shopname=${shopname}`)
}

export const skuUpdateByIdServices = ({ skuID, params }: IskuUpdateByIdServices) => {
    return axiosInstance.put(`sku/${skuID}`, params)
}

export const printPositionsServices = () => {
    return axiosInstance.get(`product/public/print-positions`)
}

export const printServicesServices = () => {
    return axiosInstance.get(`product/public/print-services`)
}