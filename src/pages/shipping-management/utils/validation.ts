import { SHIPPING_METHOD, ShippingProfile, Zone } from "../types/shipping"

export const validateShippingRate = (zone: Partial<Zone>): boolean => {
    if (!zone?.shippingMethod) return false

    if (zone.shippingMethod === SHIPPING_METHOD.THIRD_PARTY) {
        // Third party must have selected services
        return zone.thirdParty && zone.thirdParty.length > 0
    }

    if (zone.shippingMethod === SHIPPING_METHOD.CUSTOM) {
        const custom = zone.custom
        if (!custom) return false

        // Must have rate name
        if (!custom.rateName || custom.rateName.trim() === '') return false

        // Must have price based on type
        let hasPrice = false
        if (custom.type === 'flat_rate' && custom.price !== undefined && custom.price !== null) {
            hasPrice = true
        } else if (custom.type === 'weight_based' && custom.pricePerWeight !== undefined && custom.pricePerWeight !== null) {
            hasPrice = true
        } else if (custom.type === 'item_count_based' && custom.pricePerItem !== undefined && custom.pricePerItem !== null) {
            hasPrice = true
        }
        if (!hasPrice) return false

        // Must have delivery days and to value > from value   
        if (!custom.estimatedDelivery?.minDays || !custom.estimatedDelivery?.maxDays) return false
        if (custom.estimatedDelivery.maxDays <= custom.estimatedDelivery.minDays) return false

        return true
    }

    return false
}

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