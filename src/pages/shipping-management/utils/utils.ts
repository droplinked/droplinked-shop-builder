import { CUSTOM_SHIPPING_TYPE, CustomShipping, SHIPPING_METHOD, ShippingProfile, Zone } from "../types/shipping"

// Validation
export const validateShippingProfile = (shippingProfile: ShippingProfile) => {
    const { name, zones } = shippingProfile

    if (!name.trim()) throw new Error('Profile name is required.')

    if (zones.length === 0) throw new Error('At least one shipping zone is required.')

    for (const zone of zones) {
        const { shippingMethod, name: zoneName, thirdParty, custom } = zone

        if (shippingMethod === SHIPPING_METHOD.THIRD_PARTY) {
            if (!thirdParty || thirdParty.length === 0) {
                throw new Error(`The zone "${zoneName}" must have at least one shipping service.`)
            }
        }

        if (shippingMethod === SHIPPING_METHOD.CUSTOM) {
            const { minDays, maxDays } = custom?.estimatedDelivery || {}
            if (!minDays || !maxDays) {
                throw new Error(`The zone "${zoneName}" requires estimated delivery days.`)
            }
        }
    }
}

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
    estimatedDelivery: { minDays: 0, maxDays: 0 },
})