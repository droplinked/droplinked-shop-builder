export interface IproductList {
    page: number
    limit: number
    filter?: string
}

export type product_type = "NORMAL" | "PRINT_ON_DEMAND" | "DIGITAL"
export interface IproductState {
    title: string
    description: string
    productCollectionID: string
    priceUnit: string
    media: Array<string>
    shippingPrice: number
    product_type: product_type
    publish_product: boolean
    shippingType: "CUSTOM" | "EASY_POST"
    properties: Array<Iproperties>
    sku: Array<Isku>
    prodviderID: string
    pod_blank_product_id: string
    artwork: string
    artwork2: string
    artwork_position: string
    artwork2_position: string
    m2m_positions: Array<string>
    thumb: string,
    m2m_services?: Array<string>
}

export interface IpropertiesItems {
    value: string
}

export interface Iproperties {
    title: string
    value: string
    items: Array<IpropertiesItems>
}

export interface IskuOption {
    value: string
    variantID: string
    variantName: string
}

export interface IrecordData {
    _id: string
    status: "NOT_RECORDED" | "RECORDED" | "PENDING"
    recordNetwork: any
    data?: any
}

export interface Isku {
    _id?: string
    dimensions: {
        height: number
        length: number
        width: number
    }
    externalID: string
    index: number
    options: Array<IskuOption>
    price: number
    quantity: string | number
    record: Boolean
    weight: number
    recordData?: IrecordData
    image?: string
}

export interface IproductByIdServices {
    productID: string
    shopname: string
}

export interface IproductDeleteServices {
    productID: string
}

export interface IproductUpdateServices {
    productID: string
    params: any
}
