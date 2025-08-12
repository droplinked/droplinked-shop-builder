import { TrashLg } from 'assets/icons/Action/Trash/TrashLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { SHIPPING_PROFILES_QUERY_KEY } from 'pages/shipping-management/constants/constants'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteShippingProfile } from 'services/shipping-management/services'

interface Props {
    shippingProfile: ShippingProfile
    isOpen: boolean
    onClose: () => void
}

function DeleteShippingProfileModal({ shippingProfile, isOpen, onClose }: Props) {
    const queryClient = useQueryClient()
    const { t } = useLocaleResources("shipping-management")
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: () => deleteShippingProfile(shippingProfile._id)
    })

    const handleDelete = async () => {
        try {
            await mutateAsync()
            showToast({ type: "success", message: t('DeleteShippingProfileModal.toast.success') })
            queryClient.invalidateQueries({ queryKey: [SHIPPING_PROFILES_QUERY_KEY] })
            onClose()
        } catch (error) {
            showToast({ type: "error", message: t('DeleteShippingProfileModal.toast.error') })
        }
    }

    return (
        <AppConfirmationDialog
            isOpen={isOpen}
            onClose={onClose}
            icon={<TrashLg color="#fff" />}
            title={t('DeleteShippingProfileModal.title')}
            description={t('DeleteShippingProfileModal.description')}
            variant="delete"
            confirmButtonProps={{
                children: t('DeleteShippingProfileModal.confirmButton'),
                isLoading,
                onClick: handleDelete
            }}
        />
    )
}

export default DeleteShippingProfileModal
