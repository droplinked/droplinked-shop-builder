import axiosInstance from "../axiosConfig"
import { IshopService } from "./interfaces"

export const shopService = ({ shopName }: IshopService) => {
    return axiosInstance.get(`shop/${shopName}`)
}