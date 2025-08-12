import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import { useMutation } from 'react-query'
import { createShippingProfile } from 'services/shipping-management/services'

interface Props {
    shippingProfile: ShippingProfile
    isOpen: boolean
    onClose: () => void
}

function DuplicateShippingProfileModal({ shippingProfile, isOpen, onClose }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: () =>
            createShippingProfile({
                name: shippingProfile.name,
                zones: shippingProfile.zones
            })
    })

    const handleDuplicate = async () => {
        try {
            await mutateAsync()
            showToast({ type: "success", message: t('DuplicateShippingProfileModal.toast.success') })
            onClose()
        } catch (error) {
            showToast({ type: "error", message: t('DuplicateShippingProfileModal.toast.error') })
        }
    }

    return (
        <AppConfirmationDialog
            isOpen={isOpen}
            onClose={onClose}
            icon={<WarningLg color="#fff" />}
            title={t('DuplicateShippingProfileModal.title')}
            description={t('DuplicateShippingProfileModal.description')}
            confirmButtonProps={{
                children: t('DuplicateShippingProfileModal.confirmButton'),
                isLoading,
                onClick: handleDuplicate
            }}
        />
    )
}

export default DuplicateShippingProfileModal