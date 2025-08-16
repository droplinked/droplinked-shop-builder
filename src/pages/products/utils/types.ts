import { ReactNode } from "react"

export const attributeToIdMap = {
    Color: "62a989ab1f2c2bbc5b1e7153",
    Size: "62a989e21f2c2bbc5b1e7154"
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

export interface NFTData {
    deployHash?: string
    transactionUrl?: string
    networkName?: string
}

export interface Product {
    // Identifiers
    _id?: string
    ownerID?: string
    prodviderID: string
    custome_external_id: string

    // Product Type and Classification
    product_type: ProductType
    productCollectionID: string
    mainCategory?: string
    subCategories?: string[]

    // Product Details
    title: string
    description: string
    media: ProductMedia[]
    tags?: string[]
    thumb: string

    // Pricing and Commission
    priceUnit: string
    shippingModelId: string
    shippingPrice: number
    commission: number
    canBeAffiliated: boolean

    // Availability and Status
    purchaseAvailable: boolean
    isAddToCartDisabled?: boolean
    publish_product: boolean
    publish_status?: PublishStatus
    pre_purchase_data_fetch?: boolean
    launchDate?: string

    // Properties and Variants
    properties: ProductProperty[]
    sku: SKU[]

    // POD and Printing Details
    pod_blank_product_id?: string
    printful_template_id?: string
    technique?: string
    printful_option_data?: any
    artwork: string
    artwork2: string
    artwork_position: string
    artwork2_position: string
    m2m_positions: string[]
    m2m_positions_options: any[]
    m2m_services?: string[]
    positions?: ProductPosition

    // Digital Product Details
    digitalDetail?: DigitalDetails
    nftData?: NFTData
}

export interface CrawledProductsType {
    url: string
    image: string
    title: string
}

export interface ProductTypeOption {
    icon: ReactNode
    title: string
    description: string,
    productType: ProductType
}