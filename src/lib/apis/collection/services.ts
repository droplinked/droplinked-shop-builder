import axiosInstance from "../axiosConfig";
import { IcreateCollectionService } from "./interfaces";

export const collectionService = async () => {
    const response = await axiosInstance.get("collection")
    return response.data
};

export const createCollectionService = (params: IcreateCollectionService) => {
    return axiosInstance.post("collection", params)
};
