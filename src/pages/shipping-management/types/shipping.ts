export enum SHIPPING_METHOD {
    THIRD_PARTY = 'third_party',
    CUSTOM = 'custom',
}

export enum CUSTOM_SHIPPING_TYPE {
    FLAT_RATE = 'flat_rate',
    WEIGHT_BASED = 'weight_based',
    ITEM_COUNT_BASED = 'item_count_based',
}

export interface EstimatedDelivery {
    minDays: number
    maxDays: number
}

export interface CustomShipping {
    type: CUSTOM_SHIPPING_TYPE
    rateName: string
    pricePerWeight?: number
    pricePerItem?: number
    price?: number
    estimatedDelivery: EstimatedDelivery
}

export interface Zone {
    name: string
    countries: string[]
    shippingMethod: SHIPPING_METHOD
    thirdParty?: string[]
    custom?: CustomShipping
}

export interface CreateShippingRequest {
    name: string
    zones: Zone[]
}