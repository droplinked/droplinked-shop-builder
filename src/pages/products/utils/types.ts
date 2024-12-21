export const attributeToIdMap = {
    Color: "62a989ab1f2c2bbc5b1e7153",
    Size: "62a989ab1f2c2bbc5b1e7154"
}

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

export interface SKUOption {
    variantID?: string
    variantName: string
    value: string
    caption: string
    isCustom: boolean
}

export interface SKU {
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
    purchaseAvailable: boolean
}