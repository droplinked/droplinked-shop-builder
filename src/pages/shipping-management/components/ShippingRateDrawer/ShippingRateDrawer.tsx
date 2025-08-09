import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { CUSTOM_SHIPPING_TYPE, CustomShipping, SHIPPING_METHOD, Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CustomRateForm from './CustomRateForm'
import ShippingMethodSelect from './ShippingMethodSelect'
import ThirdPartyServiceSelector from './ThirdPartyServiceSelector'

interface Props {
    isOpen: boolean
    onClose: () => void
    zone: Zone
}

function ShippingRateDrawer({ isOpen, onClose, zone }: Props) {
    const { values, setFieldValue } = useFormikContext<{ zones: Zone[] }>()

    const defaultCustom = (): CustomShipping => ({
        type: CUSTOM_SHIPPING_TYPE.FLAT_RATE,
        rateName: '',
        estimatedDelivery: { minDays: 0, maxDays: 0 },
    })

    const [draftZone, setDraftZone] = useState<Zone>(() => ({
        ...zone,
        shippingMethod: zone?.shippingMethod ?? SHIPPING_METHOD.THIRD_PARTY,
    }))

    // Sync draft when prop zone changes (e.g., open different zone)
    useEffect(() => {
        setDraftZone({
            ...zone,
            shippingMethod: zone?.shippingMethod ?? SHIPPING_METHOD.THIRD_PARTY,
        })
    }, [zone, isOpen])

    const updateDraft = (patch: Partial<Zone>) => setDraftZone((prev) => ({ ...prev, ...patch }))

    const commitDraft = () => {
        const updatedZones = values.zones.map((z) => (z._id === zone?._id ? draftZone : z))
        setFieldValue('zones', updatedZones)
    }

    const shippingMethod = draftZone?.shippingMethod as SHIPPING_METHOD

    const handleSave = () => {
        commitDraft()
        onClose()
    }

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header title="Add Shipping Rate" description="Create Shipping Profile" />
            <ShippingDrawer.Body display="flex" flexDirection="column" gap={9}>
                <ShippingMethodSelect
                    value={shippingMethod}
                    onChange={(method) => {
                        if (method === SHIPPING_METHOD.THIRD_PARTY) {
                            updateDraft({
                                shippingMethod: method,
                                thirdParty: draftZone?.thirdParty ?? [],
                                custom: undefined,
                            })
                        } else {
                            updateDraft({
                                shippingMethod: method,
                                custom: draftZone?.custom ?? defaultCustom(),
                                thirdParty: undefined,
                            })
                        }
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
                    isDisabled: (() => {
                        if (shippingMethod === SHIPPING_METHOD.THIRD_PARTY) return false
                        const cr = draftZone?.custom ?? defaultCustom()
                        const hasNameAndType = cr.rateName?.trim() && cr.type
                        const hasEta =
                            typeof cr.estimatedDelivery?.minDays === 'number' &&
                            typeof cr.estimatedDelivery?.maxDays === 'number' &&
                            cr.estimatedDelivery.minDays >= 0 &&
                            cr.estimatedDelivery.maxDays >= cr.estimatedDelivery.minDays
                        const hasAmount =
                            (cr.type === CUSTOM_SHIPPING_TYPE.FLAT_RATE && typeof cr.price === 'number') ||
                            (cr.type === CUSTOM_SHIPPING_TYPE.WEIGHT_BASED && typeof cr.pricePerWeight === 'number') ||
                            (cr.type === CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED && typeof cr.pricePerItem === 'number')
                        return !(hasNameAndType && hasEta && hasAmount)
                    })(),
                }}
            />
        </ShippingDrawer>
    )
}

export default ShippingRateDrawer