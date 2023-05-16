import axiosInstance from "../axiosConfig";
import { IcreateCollectionService, IdeleteCollectionService, IupdateCollectionService } from "./interfaces";

export const collectionService = () => {
    return axiosInstance.get("collection")
};

export const createCollectionService = (params: IcreateCollectionService) => {
    return axiosInstance.post("collection", params)
};

export const updateCollectionService = ({ collectionID, title }: IupdateCollectionService) => {
    return axiosInstance.put(`collection/${collectionID}`, { title })
};

export const deleteCollectionService = ({ collectionID }: IdeleteCollectionService) => {
    return axiosInstance.delete(`collection/${collectionID}`)
};
