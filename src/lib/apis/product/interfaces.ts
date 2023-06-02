export interface IproductState {
    title: string
    description: string
    productCollectionID: string
    priceUnit: string
    media: Array<string>
    shippingPrice: number
    product_type: "NORMAL" | "PRINT_ON_DEMAND" | "DIGITAL"
    publish_product: boolean
    shippingType: "CUSTOM" | "EASY_POST"
    properties: Array<Iproperties>
    sku: Array<Isku>
    prodviderID: string
    pod_blank_product_id: string
    artwork: string
    m2m_positions: Array<string>
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
    recordNetwork: string
    casperData?: any
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
    quantity: number
    record: Boolean
    weight: number
    recordData?: IrecordData
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

export interface IskuUpdateByIdServices {
    skuID: string
    params: Isku
}