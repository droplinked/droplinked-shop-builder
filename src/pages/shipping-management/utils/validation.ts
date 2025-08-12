import { IcreateAddressService } from "services/address/interfaces"
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

    // Throw i18n keys instead of raw messages
    if (!name.trim()) throw new Error('shipping-management:validation.profileNameRequired')

    if (zones.length === 0) throw new Error('shipping-management:validation.atLeastOneZone')

    for (const zone of zones) {
        const { shippingMethod, name: zoneName, thirdParty, custom } = zone

        if (shippingMethod === SHIPPING_METHOD.THIRD_PARTY) {
            if (!thirdParty || thirdParty.length === 0) {
                throw new Error('shipping-management:validation.zoneServicesRequired')
            }
        }

        if (shippingMethod === SHIPPING_METHOD.CUSTOM) {
            const { minDays, maxDays } = custom?.estimatedDelivery || {}
            if (!minDays || !maxDays) {
                throw new Error('shipping-management:validation.zoneEstimatedDeliveryRequired')
            }
        }
    }
}

export const validateAddress = (address: IcreateAddressService) => {
    if (!address.firstName?.trim()) throw new Error('common:address.validation.firstNameRequired')
    if (!address.lastName?.trim()) throw new Error('common:address.validation.lastNameRequired')
    if (!address.addressLine1?.trim()) throw new Error('common:address.validation.addressLine1Required')
    if (!address.country?.trim()) throw new Error('common:address.validation.countryRequired')
    if (!address.state?.trim()) throw new Error('common:address.validation.stateRequired')
    if (!address.city?.trim()) throw new Error('common:address.validation.cityRequired')
    if (!address.zip?.trim()) throw new Error('common:address.validation.zipRequired')
}