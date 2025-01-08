export const attributeToIdMap = {
    Color: "62a989ab1f2c2bbc5b1e7153",
    Size: "62a989ab1f2c2bbc5b1e7154"
}

export type ProductType = "NORMAL" | "PRINT_ON_DEMAND" | "DIGITAL" | "EVENT"

export interface ProductMedia {
    _id?: string
    url: string
    thumbnail: string
    isMain: boolean | string
    fileName?: string
    fileSize?: string
}

export interface ProductPropertyItem {
    value: string, caption: string
}

export interface ProductProperty {
    value: string
    title: string
    isCustom: boolean
    items: ProductPropertyItem[]
}

export interface SKUOption {
    variantID?: string
    variantName: string
    value: string
    caption: string
    isCustom: boolean
}

export interface SKU {
    _id?: string
    externalID?: string
    index?: number
    options?: SKUOption[]
    price: number
    quantity: number
    record?: boolean
    recordData?: any
    weight?: number
    dimensions: { width?: number, height?: number, length?: number }
    rawPrice?: number
    deploy_hash?: string
    recorded_quantity?: number
    royalty?: number
}

export interface ProductPosition {
    area_width: number
    area_height: number
    width: number
    height: number
    top: number
    left: number
}

export interface DigitalDetails {
    file_url?: string
    message?: string
    chain?: string
}

export type PublishStatus = "PUBLISHED" | "DRAFTED"

export interface Product {
    _id?: string
    ownerID?: string
    product_type: ProductType
    title: string
    description: string
    media: ProductMedia[]
    productCollectionID: string
    priceUnit: string
    canBeAffiliated: boolean
    commission: number
    properties: ProductProperty[]
    sku: SKU[]
    shippingType: string,
    digitalDetail?: DigitalDetails
    keywords: string[]
    purchaseAvailable: boolean
    publish_product: boolean
    prodviderID: string
    pod_blank_product_id?: string
    printful_template_id?: string
    technique?: string
    artwork: string
    artwork2: string
    artwork_position: string
    artwork2_position: string
    m2m_positions: string[]
    thumb: string
    m2m_services?: string[]
    positions?: ProductPosition
    custome_external_id: string
    m2m_positions_options: any[]
    mainCategory?: string
    subCategories?: string[]
    isAddToCartDisabled?: boolean
    pre_purchase_data_fetch?: boolean
    printful_option_data?: any
    launchDate?: string
    publish_status?: PublishStatus
}