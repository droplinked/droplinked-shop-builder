import axiosInstance from "lib/axiosConfig";
import { Collection, IcreateCollectionService, IReorderCollectionsService, IupdateCollectionService, IupdateCollectionVisibilityService } from "./interfaces";

export const collectionService = () => axiosInstance.get<{ data: Collection[] }>("collection/list/minimal").then(res => res.data)

export const createCollectionService = (params: IcreateCollectionService) => axiosInstance.post("collection", params)

export const getAllCollectionsService = (signal: AbortSignal) => axiosInstance.get("/collection", { signal }).then((res) => res?.data)

export const updateCollectionService = ({ collectionID, title, description, image }: IupdateCollectionService) =>
    axiosInstance.put(`collection/${collectionID}`, { title, description, image })

export const updateCollectionVisiblityService = ({ collectionID, published }: IupdateCollectionVisibilityService) =>
    axiosInstance.put(`collection/${collectionID}`, { published })

export const deleteCollectionService = (collectionID: string) =>
    axiosInstance.delete(`collection/${collectionID}`)

export const reorderCollectionsService = (params: IReorderCollectionsService) => {
    axiosInstance.patch(`/collection/reorder`, params)
}