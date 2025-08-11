import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { SHIPPING_METHOD, ShippingProfile } from 'pages/shipping-management/types/shipping'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { createShippingProfile, updateShippingProfile as updateShippingProfileService } from 'services/shipping-management/services'
import ShippingDrawer from '../common/ShippingDrawer'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

interface Props {
    isOpen: boolean
    onClose: () => void
    shippingProfile?: ShippingProfile
}

const ShippingProfileDrawer = ({ isOpen, onClose, shippingProfile }: Props) => {
    const [isSaving, setIsSaving] = useState(false)
    const queryClient = useQueryClient()
    const { name, zones, resetShippingProfile, updateShippingProfile } = useShippingManagementStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("common")

    const isEditing = !!shippingProfile

    const validate = () => {
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

    const handleSave = async () => {
        try {
            setIsSaving(true)
            validate()
            if (isEditing) await updateShippingProfileService(shippingProfile?._id!, shippingProfile)
            else await createShippingProfile({ name, zones })
            showToast({ type: 'success', message: 'Shipping profile saved successfully' })
            resetShippingProfile()
            queryClient.invalidateQueries(['shipping-profiles'])
            onClose()
        } catch (error) {
            showToast({ type: 'error', message: error.message ?? t("common:genericError") })
        } finally {
            setIsSaving(false)
        }
    }

    const handleClose = () => {
        resetShippingProfile()
        onClose()
    }

    // Update the shipping profile when the modal is opened and the shipping profile is provided
    useEffect(() => {
        if (isEditing && shippingProfile) {
            updateShippingProfile("name", shippingProfile.name)
            updateShippingProfile("zones", shippingProfile.zones)
        }
    }, [isEditing, shippingProfile, updateShippingProfile])

    return (
        <ShippingDrawer isOpen={isOpen} onClose={handleClose}>
            <ShippingDrawer.Header title={`${isEditing ? 'Edit' : 'Create'} Shipping Profile`} />
            <ShippingDrawer.Body>
                <AppAccordion
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    multiCollapse
                >
                    <GeneralInformationAccordion />
                    <ZonesRatesAccordion />
                </AppAccordion>
            </ShippingDrawer.Body>
            <ShippingDrawer.Footer
                primaryText={`${isEditing ? 'Update' : 'Create'} Profile`}
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={handleClose}
                primaryButtonProps={{ isLoading: isSaving, isDisabled: isSaving }}
            />
        </ShippingDrawer>
    )
}

export default ShippingProfileDrawer