import axiosInstance from "../axiosConfig";
import { ICreateAirdropParams, ICreateAirdropResponse, IGetActivityParams, IGetActivityResponse, IGetOnchainInventoryParams, IGetOnchainInventoryResponse } from "./interface";

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

export const getAirdropActivity = ({ chain, tokenAddress, tokenId }: IGetActivityParams) => {
    return axiosInstance.get<IGetActivityResponse[]>(`nfts/activity/${chain}/${tokenAddress}/${tokenId}`)
}

export const createAirdropProcedure = (data: ICreateAirdropParams) => {
    return axiosInstance.post<ICreateAirdropResponse>("nfts/airdrop", data)
}