import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useAppToast from 'hooks/toast/useToast'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import ShippingDrawer from '../common/ShippingDrawer'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

interface Props {
    isOpen: boolean
    onClose: () => void
    shippingProfile?: ShippingProfile
}

const ShippingProfileDrawer = ({ isOpen, onClose, shippingProfile }: Props) => {
    const isEditing = !!shippingProfile
    const { showToast } = useAppToast()

    const handleSave = async () => {
        try {

        } catch (error) { }
    }

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
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
                primaryText={isEditing ? 'Update Profile' : 'Create Profile'}
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={onClose}
                primaryButtonProps={{ isLoading: false }}
            />
        </ShippingDrawer>
    )
}

export default ShippingProfileDrawer