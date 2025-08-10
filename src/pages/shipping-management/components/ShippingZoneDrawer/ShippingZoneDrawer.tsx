import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React, { useEffect, useState } from 'react'
import { SHIPPING_METHOD, Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CountrySelector from './CountrySelector'
import ZoneNameInput from './ZoneNameInput'

interface Props {
    isOpen: boolean
    onClose: () => void
    zone?: Zone
}

function ShippingZoneDrawer({ isOpen, onClose, zone }: Props) {
    const [draftZone, setDraftZone] = useState<Partial<Zone>>({
        name: '',
        countries: [],
        shippingMethod: SHIPPING_METHOD.THIRD_PARTY
    })

    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    // Update draft zone when the modal opens or when zone prop changes
    useEffect(() => {
        if (isOpen && zone) setDraftZone({ ...zone })
    }, [isOpen, zone])

    const updateDraft = (patch: Partial<Zone>) => setDraftZone((prev) => ({ ...prev, ...patch }))

    const handleSave = () => {
        const zoneToSave = { ...draftZone } as Zone

        if (!zoneToSave.name || !zoneToSave.countries) return

        // Find existing zone by checking both _id and countries
        const existingZoneIndex = zones.findIndex(z =>
            z.countries.length === zoneToSave.countries.length &&
            z.countries.every(country => zoneToSave.countries.includes(country))
        )

        if (existingZoneIndex > -1) {
            // If zone exists, update it
            const updatedZones = [...zones]
            updatedZones[existingZoneIndex] = zoneToSave
            updateShippingProfile('zones', updatedZones)
        } else {
            // Create a new zone
            updateShippingProfile('zones', [...zones, zoneToSave])
        }

        onClose()
    }

    const isNameValid = draftZone.name?.trim().length > 0
    const hasCountries = draftZone.countries?.length > 0

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header
                title={`${zone ? 'Edit' : 'Add'} Shipping Zone`}
                description="Manage zones for your shipping profiles"
            />
            <ShippingDrawer.Body display="flex" flexDirection="column" gap={9}>
                <ZoneNameInput
                    value={draftZone.name || ''}
                    onChange={(name) => updateDraft({ name })}
                />
                <CountrySelector
                    selectedCountries={draftZone.countries || []}
                    onSelectionChange={(countries) => updateDraft({ countries })}
                />
            </ShippingDrawer.Body>
            <ShippingDrawer.Footer
                primaryText="Save"
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={onClose}
                primaryButtonProps={{ isDisabled: !isNameValid || !hasCountries }}
            />
        </ShippingDrawer>
    )
}

export default ShippingZoneDrawer