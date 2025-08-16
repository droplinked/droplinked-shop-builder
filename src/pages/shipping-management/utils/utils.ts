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