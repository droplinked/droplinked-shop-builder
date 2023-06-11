import axiosInstance from "../axiosConfig";
import { IpodProductService, IproviderIDService } from "./interfaces";

export const providersService = () => {
    return axiosInstance.get("pod/providers")
};

export const providerIDService = ({ prodviderID }: IproviderIDService) => {
    return axiosInstance.get(`pod/provider/${prodviderID}/products`)
};

export const podProductService = ({ pod_blank_product_id }: IpodProductService) => {
    return axiosInstance.get(`pod/product/${pod_blank_product_id}`)
};