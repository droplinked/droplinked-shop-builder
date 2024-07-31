export interface Collection {
    _id: string;
    title: string;
    ownerID: string;
    nftImages: any[];
    type: string;
    published: boolean;
    shopId: string;
    productsCount: number;
    ruleSetID: {
        _id: string;
        collectionID: string;
        rules: {
            address: string;
            type: string;
            _id: string;
        }[],
        ownerID: string;
        webUrl: string;
        type: string;
        shopId: string;
    };
    description?: string;
    image?: string;
}

export interface IcreateCollectionService {
    title: string
    description: string
    image: string
}

export interface IupdateCollectionService {
    collectionID: string
    title: string
    image: string
    description: string
}

export interface IdeleteCollectionService {
    collectionID: string
}