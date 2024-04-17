import axiosInstance from "../axiosConfig"
import { IRetrieveNFTs } from "./interfaces"

export const retrieveNFTs = (data: IRetrieveNFTs) => {
    return axiosInstance.post(`user/retrieve/nfts?myProducts=${data.myProducts}`, data.body)
}