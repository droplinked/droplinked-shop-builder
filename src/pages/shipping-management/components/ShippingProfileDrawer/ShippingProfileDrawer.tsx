import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
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
    const { t } = useLocaleResources("shipping-management")

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
        if (isOpen && isEditing) {
            updateShippingProfile("name", editingShippingProfile.name)
            updateShippingProfile("zones", editingShippingProfile.zones)
        }
    }, [isOpen, isEditing, updateShippingProfile, editingShippingProfile])

    return (
        <ShippingDrawer isOpen={isOpen} onClose={handleClose}>
            <ShippingDrawer.Header title={isEditing ? t('ShippingProfileDrawer.header.editTitle') : t('ShippingProfileDrawer.header.createTitle')} />
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
                primaryText={isEditing ? t('ShippingProfileDrawer.footer.updateProfile') : t('ShippingProfileDrawer.footer.createProfile')}
                secondaryText={t('common:discard')}
                onPrimary={onSave}
                onSecondary={handleClose}
                primaryButtonProps={{ isLoading: isSaving, isDisabled: isSaving }}
            />
        </ShippingDrawer>
    )
}

export default ShippingProfileDrawer