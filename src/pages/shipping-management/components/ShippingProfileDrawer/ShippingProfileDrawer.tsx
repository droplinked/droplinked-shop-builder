import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React, { useEffect } from 'react'
import { useShippingProfileOperations } from '../../hooks/useShippingProfileOperations'
import ShippingDrawer from '../common/ShippingDrawer'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

interface Props {
    isOpen: boolean
    onClose: () => void
    editingShippingProfile?: ShippingProfile
}

const ShippingProfileDrawer = ({ isOpen, onClose, editingShippingProfile }: Props) => {
    const { shippingProfile, updateShippingProfile, resetState, address } = useShippingManagementStore()
    const { handleSave, isSaving } = useShippingProfileOperations()

    const isEditing = !!editingShippingProfile

    const handleClose = () => {
        resetState()
        onClose()
    }

    const onSave = () => handleSave({
        shippingProfile,
        address,
        isEditing,
        editingProfileId: editingShippingProfile?._id,
        onSuccess: handleClose
    })

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
                onPrimary={onSave}
                onSecondary={handleClose}
                primaryButtonProps={{ isLoading: isSaving, isDisabled: isSaving }}
            />
        </ShippingDrawer>
    )
}

export default ShippingProfileDrawer