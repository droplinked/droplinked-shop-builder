import axiosInstance from "../axiosConfig"
import { IgenerateBufferServices, IproductByIdServices, IproductDeleteServices, IproductList, IproductState, IproductUpdateServices } from "./interfaces"

export const productServices = ({ page, limit, filter }: IproductList) => {
    return axiosInstance.get(`product?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`)
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

export const printServicesServices = () => {
    return axiosInstance.get(`product/public/print-services`)
}

export const generateBufferServices = (urls: Array<string>) => {
    return axiosInstance.post(`product/generate/image/buffer`, urls)
}

export const productCategoryervices = () => {
    return axiosInstance.get(`product/public/categories/main`)
}

export const productsShopervices = (shopname: string) => {
    return axiosInstance.get(`product/public/shop/${shopname}?page=1&limit=5`)
}