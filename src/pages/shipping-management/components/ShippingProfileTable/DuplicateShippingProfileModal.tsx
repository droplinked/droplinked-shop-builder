import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import useAppToast from 'hooks/toast/useToast'
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
            showToast({ type: "success", message: "Shipping profile duplicated successfully" })
            onClose()
        } catch (error) {
            showToast({ type: "error", message: "Failed to duplicate shipping profile" })
        }
    }

    return (
        <AppConfirmationDialog
            isOpen={isOpen}
            onClose={onClose}
            icon={<WarningLg color="#fff" />}
            title="Duplicate Shipping Profile"
            description="Are you sure you want to duplicate this shipping profile?"
            confirmButtonProps={{
                children: 'Duplicate Profile',
                isLoading,
                onClick: handleDuplicate
            }}
        />
    )
}

export default DuplicateShippingProfileModal