import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import { validateShippingProfile } from 'pages/shipping-management/utils/utils'
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

    const handleSave = async () => {
        try {
            setIsSaving(true)
            validateShippingProfile({ name, zones })
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