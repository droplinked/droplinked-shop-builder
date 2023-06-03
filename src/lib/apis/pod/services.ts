import axiosInstance from "../axiosConfig";
import { IproviderIDService } from "./interfaces";

export const providersService = () => {
    return axiosInstance.get("pod/providers")
};

export const providerIDService = ({ prodviderID }: IproviderIDService) => {
    return axiosInstance.get(`pod/provider/${prodviderID}/products`)
};