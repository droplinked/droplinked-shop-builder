import axiosInstance from "apis/axiosConfig"
import { IproductByIdServices, IproductState, IproductUpdateServices } from "./interfaces"

export const productServices = (params: IproductState) => {
    return axiosInstance.post("product", params)
}

export const productUpdateServices = ({ productID, params }: IproductUpdateServices) => {
    return axiosInstance.put(`product/${productID}`, params)
}

export const productByIdServices = ({ productID }: IproductByIdServices) => {
    return axiosInstance.get(`product/public/${productID}`)
}