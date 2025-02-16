import { IDroplinkedNftsSkus } from "lib/apis/onchain-inventory/interface";

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
    showToast: (data: { message: string, type: "error" }) => void;
}

export interface ITransferData {
    receiver: string;
    amount: number;
}