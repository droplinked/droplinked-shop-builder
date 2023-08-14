import axiosInstance from "../axiosConfig";
import { IpodAvailableVariantsService, IpodProductService, IpodVariantsService, IproviderIDService } from "./interfaces";

export const providersService = () => {
    return axiosInstance.get("pod/providers")
};

export const providerIDService = ({ prodviderID }: IproviderIDService) => {
    return axiosInstance.get(`pod/provider/${prodviderID}/products`)
};

export const podProductService = ({ pod_blank_product_id }: IpodProductService) => {
    return axiosInstance.get(`pod/product/${pod_blank_product_id}`)
};

export const podVariantsService = ({ provider, productId }: IpodVariantsService) => {
    return axiosInstance.get(`pod/variant-options/${provider}/${productId}`)
};

export const podAvailableVariantsService = ({ provider, productId }: IpodAvailableVariantsService) => {
    return axiosInstance.get(`pod/available-variants/${provider}/${productId}`)
};