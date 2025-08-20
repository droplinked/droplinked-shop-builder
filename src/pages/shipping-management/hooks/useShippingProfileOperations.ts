import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { createAddressService } from 'services/address/addressServices'
import { IcreateAddressService } from 'services/address/interfaces'
import { createShippingProfile, updateShippingProfile as updateShippingProfileService } from 'services/shipping-management/services'
import useAppStore from 'stores/app/appStore'
import { SHIPPING_PROFILES_QUERY_KEY } from '../constants/constants'
import { ShippingProfile } from '../types/shipping'
import { validateAddress, validateShippingProfile } from '../utils/validation'

interface SaveShippingProfileParams {
    shippingProfile: ShippingProfile
    address: IcreateAddressService
    isEditing: boolean
    editingProfileId?: string
    onSuccess?: () => void
}

export const useShippingProfileOperations = () => {
    const [isSaving, setIsSaving] = useState(false)
    const queryClient = useQueryClient()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("shipping-management")
    const { shop, updateShop } = useAppStore()

    const handleSave = async (params: SaveShippingProfileParams) => {
        const { shippingProfile, address, isEditing, editingProfileId, onSuccess } = params
        try {
            setIsSaving(true)

            // Validate shipping profile
            validateShippingProfile(shippingProfile)

            if (isEditing) {
                // Update existing profile
                await updateShippingProfileService(editingProfileId!, shippingProfile)
                showToast({ type: 'success', message: t('useShippingProfileOperations.toast.updateSuccess') })
            } else {
                // Create new profile - check if address exists
                const { addressBookID } = shop

                if (!addressBookID) {
                    // Validate address before creating
                    validateAddress(address)

                    const createdAddress = await createAddressService(address)
                    const addressId = createdAddress.data.data._id

                    // Update shop with new address ID
                    updateShop({ ...shop, addressBookID: addressId })
                }

                // Create shipping profile
                await createShippingProfile({
                    name: shippingProfile.name,
                    zones: shippingProfile.zones
                })

                showToast({ type: 'success', message: t('useShippingProfileOperations.toast.createSuccess') })
            }

            queryClient.invalidateQueries([SHIPPING_PROFILES_QUERY_KEY])
            onSuccess?.()

        } catch (error) {
            const errorKey = typeof error.message === 'string' ? error.message : ''
            // If the error message looks like a translation key, translate it; otherwise fallback to generic
            const translated = errorKey.includes(':') ? t(errorKey) : t('common:genericError')
            showToast({
                type: 'error',
                message: translated
            })
        } finally {
            setIsSaving(false)
        }
    }

    return { handleSave, isSaving }
}