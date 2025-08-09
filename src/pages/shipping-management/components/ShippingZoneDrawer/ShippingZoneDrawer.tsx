import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { SHIPPING_METHOD, Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import CountrySelector from './CountrySelector'
import ZoneNameInput from './ZoneNameInput'

interface Props {
    isOpen: boolean
    onClose: () => void
    zone?: Zone
    onSave: (zone: Zone) => void
}

const COUNTRIES = [
    'Worldwide', 'European Union', 'Belgium', 'Greece', 'Lithuania',
    'Portugal', 'Afghanistan', 'Albania', 'Algeria', 'Angola',
]

function ShippingZoneDrawer({ isOpen, onClose, zone, onSave }: Props) {
    const { setFieldValue, values } = useFormikContext<{ zones: Zone[] }>()
    const [draftZone, setDraftZone] = useState<Partial<Zone>>({})

    useEffect(() => {
        if (isOpen) {
            setDraftZone(zone || { shippingMethod: SHIPPING_METHOD.CUSTOM, countries: [], name: '' })
        }
    }, [isOpen, zone])

    const updateDraft = (patch: Partial<Zone>) => {
        setDraftZone((prev) => ({ ...prev, ...patch }))
    }

    const handleSave = () => {
        const zoneToSave = { ...draftZone, _id: draftZone._id || String(Date.now()) } as Zone

        const existingZoneIndex = values.zones.findIndex(z => z._id === zoneToSave._id)

        if (existingZoneIndex > -1) {
            const updatedZones = [...values.zones]
            updatedZones[existingZoneIndex] = zoneToSave
            setFieldValue('zones', updatedZones)
        } else {
            onSave(zoneToSave)
        }

        onClose()
    }

    const isNameValid = draftZone.name && draftZone.name.trim().length > 0
    const hasCountries = draftZone.countries && draftZone.countries.length > 0

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header
                title={zone ? "Edit Shipping Zone" : "Add Shipping Zone"}
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