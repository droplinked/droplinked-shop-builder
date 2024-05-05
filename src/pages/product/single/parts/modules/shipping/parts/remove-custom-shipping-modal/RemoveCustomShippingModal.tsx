import AppDialog from 'components/common/dialog'
import useAppToast from 'functions/hooks/toast/useToast'
import { deleteCustomShippingService } from 'lib/apis/custom-shipping/CustomShippingServices'
import React from 'react'
import { useMutation } from 'react-query'

interface Props {
    isOpen: boolean;
    close: () => void;
    shippingId: string;
    refetchCustomShippings: () => void
}

function RemoveCustomShippingModal({ isOpen, close, shippingId, refetchCustomShippings }: Props) {
    const { mutateAsync, isLoading } = useMutation((id: string) => deleteCustomShippingService(id))
    const { showToast } = useAppToast()

    const handleDelete = async () => {
        try {
            await mutateAsync(shippingId)
            showToast({ type: "success", message: "Custom shipping successfully deleted!" })
            close()
            refetchCustomShippings()
        } catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    return (
        <AppDialog
            open={isOpen}
            close={close}
            title="Delete Custom Shipping"
            text={"Are you sure you want to delete this custom shipping? You will no longer have access to this shipping."}
            buttons={[
                {
                    children: "Cancel",
                    onClick: close,
                    buttonProps: { variant: "outline" }
                },
                {
                    children: "Delete",
                    buttonProps: { isLoading, isDisabled: isLoading },
                    onClick: () => handleDelete()
                }
            ]}
        />
    )
}

export default RemoveCustomShippingModal