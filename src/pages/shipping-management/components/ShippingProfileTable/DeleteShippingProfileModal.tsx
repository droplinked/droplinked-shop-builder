import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import React from 'react'

interface Props {
    shippingProfile: any
    isOpen: boolean
    onClose: () => void
}

function DeleteShippingProfileModal({ shippingProfile, isOpen, onClose }: Props) {
    const handleDelete = () => {
        console.log('Delete shipping profile:', shippingProfile)
        onClose()
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
                onClick: handleDelete
            }}
        />
    )
}

export default DeleteShippingProfileModal
