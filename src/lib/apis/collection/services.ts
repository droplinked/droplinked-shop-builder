import axiosInstance from "../axiosConfig";
import { Collection, IcreateCollectionService, IdeleteCollectionService, IupdateCollectionService } from "./interfaces";

export const collectionService = () => axiosInstance.get<{ data: Collection[] }>("collection/list/minimal").then(res => res.data)

export const createCollectionService = (params: IcreateCollectionService) => axiosInstance.post("collection", params)

export const updateCollectionService = ({ collectionID, title, description, image }: IupdateCollectionService) =>
    axiosInstance.put(`collection/${collectionID}`, { title, description, image })

export const deleteCollectionService = ({ collectionID }: IdeleteCollectionService) =>
    axiosInstance.delete(`collection/${collectionID}`)