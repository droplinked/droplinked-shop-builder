export interface ProductMedia {
    _id?: string
    url: string
    thumbnail: string
    isMain: boolean | string
    fileName?: string
    fileSize?: string
}

export interface ProductProperty {
    value: string
    title: string
    isCustom: boolean
    items: { value: string, caption: string }[]
}

interface SKUOption {
    variantID?: string
    variantName: string
    value: string
    caption: string
    isCustom: boolean
}

interface SKU {
    externalID?: string
    index?: number
    options?: SKUOption[]
    price: number
    quantity: number
    record?: boolean
    recordData?: any
    weight?: number
    dimensions: { width?: number, height?: number, length?: number }

    deploy_hash?: string
    recorded_quantity?: number
    royalty?: number
}

export interface ProductFormValues {
    action: string
    product_type: string
    title: string
    description: string
    media: ProductMedia[]
    productCollectionID: string
    canBeAffiliated: boolean
    commission: number,
    properties: ProductProperty[],
    sku: SKU[],
    shippingType: string,
    digitalDetail?: { chain: string },
    keywords: string[]
}