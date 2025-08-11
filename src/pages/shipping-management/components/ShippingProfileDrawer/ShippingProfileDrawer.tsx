import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import { validateShippingProfile } from 'pages/shipping-management/utils/validation'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { createShippingProfile, updateShippingProfile as updateShippingProfileService } from 'services/shipping-management/services'
import ShippingDrawer from '../common/ShippingDrawer'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

interface Props {
    isOpen: boolean
    onClose: () => void
    editingShippingProfile?: ShippingProfile
}

const ShippingProfileDrawer = ({ isOpen, onClose, editingShippingProfile }: Props) => {
    const [isSaving, setIsSaving] = useState(false)
    const queryClient = useQueryClient()
    const { shippingProfile, updateShippingProfile, resetState } = useShippingManagementStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("common")

    const isEditing = !!editingShippingProfile

    const handleSave = async () => {
        try {
            setIsSaving(true)
            validateShippingProfile(shippingProfile)
            if (isEditing) await updateShippingProfileService(editingShippingProfile?._id!, shippingProfile)
            else await createShippingProfile({ name: shippingProfile.name, zones: shippingProfile.zones })
            showToast({ type: 'success', message: 'Shipping profile saved successfully' })
            resetState()
            queryClient.invalidateQueries(['shipping-profiles'])
            onClose()
        } catch (error) {
            showToast({ type: 'error', message: error.message ?? t("common:genericError") })
        } finally {
            setIsSaving(false)
        }
    }

    const handleClose = () => {
        resetState()
        onClose()
    }

    // Update the shipping profile when the modal is opened and the shipping profile is provided
    useEffect(() => {
        if (isEditing && editingShippingProfile) {
            updateShippingProfile("name", editingShippingProfile.name)
            updateShippingProfile("zones", editingShippingProfile.zones)
        }
    }, [isEditing, editingShippingProfile, updateShippingProfile])

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