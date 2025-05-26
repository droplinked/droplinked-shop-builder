import { IDroplinkedNftsSkus } from "services/onchain-inventory/interface";

export interface ICombinedNft {
    chain: string;
    imageUrl: string;
    name: string;
    quantity: number | string;
    price?: number;
    description?: string;
    tokenAddress?: string;
    tokenId?: string;
    productAddress?: string;
    sku?: IDroplinkedNftsSkus[];
    ownerAddress: string;
    isDroplinkedProduct: boolean;
}

export interface IManualTransferValidation {
    manualTransferData: ITransferData[];
    quantity: number;
    showToast: (data: { message: string, description?: string, type: "error" }) => void;
    t: (key: string) => string;
}

export interface ITransferData {
    receiver: string;
    amount: number;
}