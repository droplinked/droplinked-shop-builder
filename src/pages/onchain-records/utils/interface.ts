import { IDroplinkedNftsSkus } from "lib/apis/onchain-inventory/interface";

export interface ICombinedNft {
    //Droplinked NFTs Data type
    image?: string;
    name?: string;

    //we have chain key in both droplinked and wallet NFTs
    chain: string;

    productAddress?: string;
    productQuantity?: number;
    productPrice?: number;
    skus?: IDroplinkedNftsSkus[];

    //User wallet NFTs Data type
    collectionName?: string;
    imageUrl?: string;
    tokenAddress?: string;
    tokenId?: string;
    amount?: string;
    description?: string;
    tokenType?: string;
}