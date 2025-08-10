import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { SHIPPING_METHOD, ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import { createShippingProfile, updateShippingProfile } from 'services/shipping-management/services'
import ShippingDrawer from '../common/ShippingDrawer'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

interface Props {
    isOpen: boolean
    onClose: () => void
    shippingProfile?: ShippingProfile
}

const ShippingProfileDrawer = ({ isOpen, onClose, shippingProfile }: Props) => {
    const { name, zones } = useShippingManagementStore()
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
            validate()
            if (isEditing) await updateShippingProfile(shippingProfile?._id!, shippingProfile)
            else await createShippingProfile(shippingProfile)
            showToast({ type: 'success', message: 'Shipping profile saved successfully' })
            onClose()
        } catch (error) {
            showToast({ type: 'error', message: error.message ?? t("common:genericError") })
            return
        }
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
                primaryText={`${isEditing ? 'Update' : 'Create'} Profile`}
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={onClose}
                primaryButtonProps={{ isLoading: false }}
            />
        </ShippingDrawer>
    )
}

export default ShippingProfileDrawer