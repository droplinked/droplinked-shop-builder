import { LegalUsage } from "../subscription/interfaces";

export interface IProductFetchParams {
    page: number;
    limit: number;
    filter?: string;
}

export interface IProductPosition {
    area_width: number;
    area_height: number;
    width: number;
    height: number;
    top: number;
    left: number;
}

export type product_type = "NORMAL" | "PRINT_ON_DEMAND" | "DIGITAL" | "EVENT";

export interface IDigitalLinks {
    file_url?: string;
    message?: string;
    chain?: string;
}

export interface Imedia {
    isMain: boolean;
    url: string;
    thumbnail: string;
    isMockup?: boolean;
}

export interface IproductState {
    _id?: string;
    ownerID?: string;
    title: string;
    description: string;
    productCollectionID: string;
    priceUnit: string;
    media: Array<Imedia>;
    shippingPrice: number;
    product_type: product_type;
    publish_product: boolean;
    shippingType: string;
    properties: Array<Iproperties>;
    sku: Array<Isku>;
    prodviderID: string;
    pod_blank_product_id: string;
    artwork: string;
    artwork2: string;
    artwork_position: string;
    artwork2_position: string;
    m2m_positions: Array<string>;
    thumb: string;
    m2m_services?: Array<string>;
    purchaseAvailable: boolean;
    positions?: IProductPosition;
    printful_template_id?: string;
    custome_external_id: string;
    digitalDetail: IDigitalLinks | undefined;
    m2m_positions_options: Array<any>;
    mainCategory?: string;
    subCategories?: Array<string>;
    technique?: string;
    isAddToCartDisabled?: boolean;
    pre_purchase_data_fetch?: boolean;
    productTile?: any[];
    printful_option_data?: any;
    launchDate?: string | null;
    legalUsage: LegalUsage[];
    publish_status?: "PUBLISHED" | "DRAFTED";
    commission?: number;
    canBeAffiliated?: boolean;
}

export interface IpropertiesItems {
    value: string;
    caption: string;
}

export interface Iproperties {
    title: string;
    items: Array<IpropertiesItems>;
    isCustom?: boolean;
    // propery_type: VARIANT_OPTIONS_ENUM | null
    custom_title?: string;
}

export interface IskuOption {
    value: string;
    variantName: string;
    variantID: string;
    caption: string;
}

export interface IrecordData {
    _id: string;
    status: "NOT_RECORDED" | "RECORDED" | "PENDING";
    recordNetwork: any;
    data?: any;
    commision?: number;
    deploy_hash?: string;
}

export interface Isku {
    _id?: string;
    dimensions: {
        height: number;
        length: number;
        width: number;
    };
    externalID: string;
    index: number;
    rawPrice?: number;
    options: Array<IskuOption>;
    price: number;
    quantity: number;
    record: Boolean;
    weight: number;
    recordData?: IrecordData;
    image?: string;
    recorded_quantity?: number;
    deploy_hash_link?: string;
    deployedShopAddress: string;
    royalty?: number;
}

export interface IproductByIdServices {
    productID: string;
    shopname: string;
}

export interface IproductDeleteServices {
    productID: string;
}

export interface IproductUpdateServices {
    productID: string;
    params: any;
}

export interface IgenerateBufferServices {
    urls: Array<string>;
}

export interface IProductReorder {
    productId: string;
    newPosition: number;
}

export interface IProductTile {
    skuIDs: string[];
}

export interface IGetProductsCommunityService {
    limit: number;
    page: number;
    title?: string;
    categoryIds?: string[];
    subCategoryIds?: string[];
    lowestPrice?: number;
    highestPrice?: number;
    lowestCommission?: number;
    highestCommission?: number;
    sort?: string;
}

export interface IGetSingleProductCommunity {
    user: boolean;
    slug: string;
}

export interface IimportAffiliateProduct {
    productId: string;
}

export interface IGetHotProductsParams {
    range?: "daily" | "weekly" | "monthly";
}
