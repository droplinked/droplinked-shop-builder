import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { defaultCustom, defaultZone } from 'pages/shipping-management/utils/utils'
import { validateShippingRate } from 'pages/shipping-management/utils/validation'
import React, { useEffect, useState } from 'react'
import { SHIPPING_METHOD, Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CustomRateForm from './CustomRateForm'
import ShippingMethodSelect from './ShippingMethodSelect'
import ThirdPartyServiceSelector from './ThirdPartyServiceSelector'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean
    onClose: () => void
    zoneIndex: number
}

function ShippingRateDrawer({ isOpen, onClose, zoneIndex }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const [draftZone, setDraftZone] = useState<Partial<Zone>>(defaultZone)
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.shippingProfile.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    const shippingMethod = draftZone?.shippingMethod as SHIPPING_METHOD

    const updateDraft = (patch: Partial<Zone>) => {
        setDraftZone((prev) => ({ ...prev, ...patch }))
    }

    // Check if form can be submitted based on validation rules
    const canSubmit = () => validateShippingRate(draftZone)

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
            <ShippingDrawer.Header title={t('ShippingRateDrawer.header.title')} description={t('ShippingRateDrawer.header.description')} />
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
                primaryText={t('common:save')}
                secondaryText={t('common:discard')}
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