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
    console.log('draftZone', draftZone)
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    const shippingMethod = draftZone?.shippingMethod as SHIPPING_METHOD

    const updateDraft = (patch: Partial<Zone>) => {
        setDraftZone((prev) => ({ ...prev, ...patch }))
    }

    const handleSave = () => {
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
                primaryButtonProps={{}}
            />
        </ShippingDrawer>
    )
}

export default ShippingRateDrawer