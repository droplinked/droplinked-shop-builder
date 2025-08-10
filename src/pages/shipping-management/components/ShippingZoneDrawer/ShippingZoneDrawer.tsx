import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React, { useEffect, useState } from 'react'
import { Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CountrySelector from './CountrySelector'
import ZoneNameInput from './ZoneNameInput'

interface Props {
    isOpen: boolean
    onClose: () => void
    zone?: Zone
}

const COUNTRIES = [
    'Worldwide', 'European Union', 'Belgium', 'Greece', 'Lithuania',
    'Portugal', 'Afghanistan', 'Albania', 'Algeria', 'Angola',
]

function ShippingZoneDrawer({ isOpen, onClose, zone }: Props) {
    const [draftZone, setDraftZone] = useState<Partial<Zone>>({})
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    useEffect(() => {
        isOpen && setDraftZone(zone)
    }, [isOpen, zone])

    const updateDraft = (patch: Partial<Zone>) => {
        setDraftZone((prev) => ({ ...prev, ...patch }))
    }

    const handleSave = () => {
        const zoneToSave = { ...draftZone } as Zone
        const existingZoneIndex = zones.findIndex(z => z._id === zoneToSave._id)

        if (existingZoneIndex > -1) {
            const updatedZones = [...zones]
            updatedZones[existingZoneIndex] = zoneToSave
            updateShippingProfile('zones', updatedZones)
        }

        onClose()
    }

    const isNameValid = draftZone.name && draftZone.name.trim().length > 0
    const hasCountries = draftZone.countries && draftZone.countries.length > 0

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
                    currentZoneId={zone?._id}
                />
                <CountrySelector
                    allCountries={COUNTRIES}
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