import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { defaultCustom, defaultZone } from 'pages/shipping-management/utils/utils'
import React, { useEffect, useState } from 'react'
import { SHIPPING_METHOD, Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CustomRateForm from './CustomRateForm'
import ShippingMethodSelect from './ShippingMethodSelect'
import ThirdPartyServiceSelector from './ThirdPartyServiceSelector'

interface Props {
    isOpen: boolean
    onClose: () => void
    zoneIndex: number
}

function ShippingRateDrawer({ isOpen, onClose, zoneIndex }: Props) {
    const [draftZone, setDraftZone] = useState<Partial<Zone>>(defaultZone)
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    const shippingMethod = draftZone?.shippingMethod as SHIPPING_METHOD

    const updateDraft = (patch: Partial<Zone>) => {
        setDraftZone((prev) => ({ ...prev, ...patch }))
    }

    // Check if form can be submitted based on validation rules
    const canSubmit = () => {
        if (!draftZone?.shippingMethod) return false

        if (draftZone.shippingMethod === SHIPPING_METHOD.THIRD_PARTY) {
            // Third party must have selected services
            return draftZone.thirdParty && draftZone.thirdParty.length > 0
        }

        if (draftZone.shippingMethod === SHIPPING_METHOD.CUSTOM) {
            const custom = draftZone.custom
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

    const handleSave = () => {
        if (!canSubmit()) return

        const zoneToSave = { ...draftZone } as Zone
        const updatedZones = [...zones]
        updatedZones[zoneIndex] = zoneToSave
        updateShippingProfile('zones', updatedZones)
        onClose()
    }

    // Update draft zone when the modal opens or when zone prop changes
    useEffect(() => {
        if (zoneIndex !== undefined) {
            const zone = zones[zoneIndex]
            setDraftZone({ ...zone })
        }
    }, [zoneIndex])

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header title="Add Shipping Rate" description="Create Shipping Profile" />
            <ShippingDrawer.Body display="flex" flexDirection="column" gap={9}>
                <ShippingMethodSelect
                    value={shippingMethod}
                    onChange={(method) => {
                        updateDraft({
                            shippingMethod: method,
                            thirdParty: method === SHIPPING_METHOD.THIRD_PARTY ? [] : undefined,
                            custom: method === SHIPPING_METHOD.CUSTOM ? defaultCustom() : undefined,
                        })
                    }}
                />

                {shippingMethod === SHIPPING_METHOD.THIRD_PARTY && (
                    <ThirdPartyServiceSelector
                        selected={draftZone?.thirdParty ?? []}
                        onChange={(services) => updateDraft({ thirdParty: services })}
                    />
                )}

                {shippingMethod === SHIPPING_METHOD.CUSTOM && (
                    <CustomRateForm
                        value={draftZone?.custom ?? defaultCustom()}
                        onChange={(cr) => updateDraft({ custom: cr })}
                    />
                )}
            </ShippingDrawer.Body>
            <ShippingDrawer.Footer
                primaryText="Save"
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={onClose}
                primaryButtonProps={{
                    isDisabled: !canSubmit()
                }}
            />
        </ShippingDrawer>
    )
}

export default ShippingRateDrawer