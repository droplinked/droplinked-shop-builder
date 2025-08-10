import useShippingManagementStore, { initialZone } from 'pages/shipping-management/stores/useShippingManagementStore'
import React, { useEffect, useState } from 'react'
import { Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CountrySelector from './CountrySelector'
import ZoneNameInput from './ZoneNameInput'

interface Props {
    isOpen: boolean
    onClose: () => void
    zoneIndex?: number
}

function ShippingZoneDrawer({ isOpen, onClose, zoneIndex }: Props) {
    const [draftZone, setDraftZone] = useState<Partial<Zone>>(initialZone)
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    const isNameValid = draftZone.name?.trim().length > 0
    const hasCountries = draftZone.countries?.length > 0

    const updateDraft = (patch: Partial<Zone>) => {
        setDraftZone((prev) => ({ ...prev, ...patch }))
    }

    const handleSave = () => {
        const zoneToSave = { ...draftZone } as Zone

        if (!zoneToSave.name || !zoneToSave.countries) return

        if (zoneIndex !== undefined) {
            // If zone exists, update it
            const updatedZones = [...zones]
            updatedZones[zoneIndex] = zoneToSave
            updateShippingProfile('zones', updatedZones)
        } else {
            // Create a new zone
            updateShippingProfile('zones', [...zones, zoneToSave])
        }

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
            <ShippingDrawer.Header
                title={`${zoneIndex ? 'Edit' : 'Add'} Shipping Zone`}
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