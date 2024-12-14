export interface ProductMedia {
    _id?: string
    url: string
    thumbnail: string
    isMain: boolean | string
    fileName?: string
    fileSize?: string
}

interface SKUOption {

}

interface SKU {
    externalID?: string
    index?: number
    options?: SKUOption[]
    price: number
    quantity: number
    record?: boolean
    recordData?: any
    recorded_quantity?: number
    weight?: number
    deploy_hash?: string
    dimensions: { width?: number, height?: number, length?: number }
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
    keywords: string[],
    sku: SKU[],
    shippingType: string,
    digitalDetail?: {
        chain: string
    }
}