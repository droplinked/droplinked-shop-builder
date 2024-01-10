import axiosInstance from "../axiosConfig";
import { IrecordCasperService } from "./interfaces";

export const supportedChainsService = () => {
    return axiosInstance.get(`sku/record/supported-chains`)
}

export const recordCasperService = ({ chain, params }: IrecordCasperService) => {
    return axiosInstance.post(`sku/record/${chain}`, params)
}

export const getSkuByIdService = (skuId: string) => {
    return axiosInstance.get(`sku/${skuId}`)
}