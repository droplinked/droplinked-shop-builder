import axiosInstance from "lib/axiosConfig";
import { ICreateAirdropParams, ICreateAirdropResponse, IGetActivityParams, IGetActivityResponse, IGetOnchainInventoryParams, IGetOnchainInventoryResponse, IProcessAirdropResponse, IUploadWalletCSVResponse } from "./interface";

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

export const processAirdropTransaction = ({ id, transactionHashes }: { id: string, transactionHashes: string[] }) => {
    return axiosInstance.post<IProcessAirdropResponse>(`nfts/airdrop/${id}`, transactionHashes)
}

export const uploadWalletsCSV = (formData: FormData) => {
    return axiosInstance.post<IUploadWalletCSVResponse>("/nfts/import-wallets", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
