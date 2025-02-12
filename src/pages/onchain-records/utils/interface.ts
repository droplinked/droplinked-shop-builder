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