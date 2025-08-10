import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import useAppToast from 'hooks/toast/useToast'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import { useMutation } from 'react-query'
import { deleteShippingProfile } from 'services/shipping-management/services'

interface Props {
    shippingProfile: ShippingProfile
    isOpen: boolean
    onClose: () => void
}

function DeleteShippingProfileModal({ shippingProfile, isOpen, onClose }: Props) {
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: () => deleteShippingProfile(shippingProfile._id)
    })
    const { showToast } = useAppToast()

    const handleDelete = async () => {
        try {
            await mutateAsync()
            showToast({ type: "success", message: "Shipping profile deleted successfully" })
            onClose()
        } catch (error) {
            showToast({ type: "error", message: "Failed to delete shipping profile" })
        }
    }

    return (
        <AppConfirmationDialog
            isOpen={isOpen}
            onClose={onClose}
            icon={<WarningLg color="#fff" />}
            title="Delete Shipping Profile"
            description="Are you sure you want to delete this shipping profile? It will be permanently removed and this action cannot be undone."
            variant="delete"
            confirmButtonProps={{
                children: 'Delete Profile',
                isLoading,
                onClick: handleDelete
            }}
        />
    )
}

export default DeleteShippingProfileModal
