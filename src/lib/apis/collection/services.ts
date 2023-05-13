import axiosInstance from "../axiosConfig";
import { IcreateCollectionService, IdeleteCollectionService } from "./interfaces";

export const collectionService = () => {
    return axiosInstance.get("collection")
};

export const createCollectionService = (params: IcreateCollectionService) => {
    return axiosInstance.post("collection", params)
};

export const deleteCollectionService = ({ collectionID }: IdeleteCollectionService) => {
    return axiosInstance.delete(`collection/${collectionID}`)
};
