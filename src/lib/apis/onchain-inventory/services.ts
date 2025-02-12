import axiosInstance from "../axiosConfig";
import { IGetOnchainInventoryParams, IGetOnchainInventoryResponse } from "./interface";

export const getOnchainInventory = (params: IGetOnchainInventoryParams = {}) => {
    const queryParams = new URLSearchParams(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    );

    return axiosInstance.get<IGetOnchainInventoryResponse>(
        `nfts/retrieve${queryParams.toString() ? `?${queryParams}` : ''}`
    );
}