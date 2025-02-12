export interface IGetOnchainInventoryParams {
    chain?: string;
    wallet?: string;
    myProducts?: boolean;
    search?: string;
}

export interface IDroplinkedNftsVas {
    name: string;
    costType: string;
    value: number;
    type: string;
    receiver: string;
}

export interface IDroplinkedNftsDimensions {
    height: number;
    length: number;
    width: number;
}

export interface IDroplinkedNftsPartialOwner {
    user: string;
    quantity: number;
}

export interface IDroplinkedNftsSkuOptions {
    variantID: string;
    variantName: string;
    value: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface IDroplinkedNftsRecordData {
    status: string;
    recordNetwork: string;
    currency: string;
    commision: number;
    data: {
        event_type: string;
        details: {
            productId: string;
            amount: string;
            owner: string;
            uri: string;
        }
    }
}

export interface IDroplinkedNftsSkus {
    _id: string;
    ownerID: string;
    shopIds: string[];
    recordData: IDroplinkedNftsRecordData;
    price: number;
    quantity: number;
    recorded_quantity: number;
    weight: number | null;
    sold_units: number;
    externalID: string;
    dimensions: IDroplinkedNftsDimensions;
    deploy_hash: string;
    royalty: number | null;
    externalTicketId: null;
    commision: number;
    partialOwners: IDroplinkedNftsPartialOwner[];
    options: IDroplinkedNftsSkuOptions[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    metadata: string;
    metadataUrl: string;
    canBeAffiliated: boolean;
    deploy_hash_link: string;
    vas?: IDroplinkedNftsVas[];
    rawPrice?: number;
}

export interface IDroplinkedNFTs {
    image: string;
    name: string;
    chain: string;
    productAddress: string;
    productQuantity: number;
    productPrice: number;
    skus: IDroplinkedNftsSkus[];
    ownerAddress: string;
}

export interface IWalletNFTs {
    collectionName: string;
    imageUrl: string;
    tokenAddress: string;
    tokenId: string;
    amount: string;
    description: string;
    tokenType: string;
    chain: string;
    ownerAddress: string;
}

export interface IGetOnchainInventoryResponse {
    droplinkedNFTs: IDroplinkedNFTs[];
    walletNFTs: IWalletNFTs[];
}