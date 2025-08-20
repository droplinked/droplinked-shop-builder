import { CUSTOM_SHIPPING_TYPE, CustomShipping, SHIPPING_METHOD, Zone } from "../types/shipping"

// Helpers
export function humanizeCustomType(type: CUSTOM_SHIPPING_TYPE) {
    switch (type) {
        case CUSTOM_SHIPPING_TYPE.FLAT_RATE:
            return 'Flat Rate'
        case CUSTOM_SHIPPING_TYPE.WEIGHT_BASED:
            return 'Weight Based Rate'
        case CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED:
            return 'Order Based Rate'
        default:
            return ''
    }
}

export const getEmoji = (emojiU: string) => {
    if (!emojiU) return ''
    try {
        const codes = emojiU.split(' ').map(code => parseInt(code.replace('U+', ''), 16))
        return String.fromCodePoint(...codes)
    } catch {
        return ''
    }
}

// Defaults
export const defaultZone = (): Zone => ({
    name: "",
    countries: [],
    shippingMethod: SHIPPING_METHOD.THIRD_PARTY
})

export const defaultCustom = (): CustomShipping => ({
    type: CUSTOM_SHIPPING_TYPE.FLAT_RATE,
    rateName: '',
    estimatedDelivery: { minDays: undefined, maxDays: undefined },
})

// Currency Conversion Utility
export const convertZonePrices = (
    zone: Zone,
    convertPrice: (params: { amount: number; toUSD?: boolean }) => number,
    toUSD: boolean
): Zone => {
    if (!zone.custom) return zone

    const convertedZone = { ...zone }
    const custom = { ...zone.custom }

    if (custom.price) {
        custom.price = parseFloat(convertPrice({ amount: custom.price, toUSD }).toFixed(2))
    }
    if (custom.pricePerWeight) {
        custom.pricePerWeight = parseFloat(convertPrice({ amount: custom.pricePerWeight, toUSD }).toFixed(2))
    }
    if (custom.pricePerItem) {
        custom.pricePerItem = parseFloat(convertPrice({ amount: custom.pricePerItem, toUSD }).toFixed(2))
    }

    convertedZone.custom = custom
    return convertedZone
}