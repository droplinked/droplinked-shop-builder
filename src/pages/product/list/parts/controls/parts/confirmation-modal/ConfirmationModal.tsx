import AppDialog from 'components/common/dialog'
import useAppToast from 'functions/hooks/toast/useToast'
import { IproductDeleteServices } from 'lib/apis/product/interfaces'
import { duplicateProductService, productDeleteServices } from 'lib/apis/product/productServices'
import React from 'react'
import { useMutation } from 'react-query'
import { action } from '../../Controls'

interface IProps {
    open: boolean
    close: () => void
    fetch: () => void
    productID: string
    action: action
}

function ConfirmationModal({ open, close, fetch, productID, action }: IProps) {
    const deleteMutation = useMutation((params: IproductDeleteServices) => productDeleteServices(params))
    const duplicateMutation = useMutation(() => duplicateProductService(productID))
    const isLoading = deleteMutation.isLoading || duplicateMutation.isLoading
    const { showToast } = useAppToast()
    const modalExplanation = action === "DELETE" ?
        "Are you sure you want to delete this product? You will no longer have access to this product." :
        "Are you sure you want to duplicate this product? "

    const handleAction = async () => {
        try {
            if (action === "DELETE") {
                await deleteMutation.mutateAsync({ productID })
                showToast({ message: "The product has been deleted!", type: "success" })
                return
            }
            await duplicateMutation.mutateAsync()
            showToast({ message: "The product has been duplicated!", type: "success" })
        } catch (error) {
            showToast({ message: "Oops! Something went wrong", type: "error" })
        }
        finally {
            fetch()
            close()
        }
    }

    return (
        <AppDialog
            open={open}
            close={() => { }}
            title={`${action === "DELETE" ? "Delete" : "Duplicate"} Product`}
            text={modalExplanation}
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => close(),
                    buttonProps: {
                        variant: "outline"
                    }
                },
                {
                    children: action === "DELETE" ? "Delete" : "Duplicate",
                    buttonProps: { isLoading },
                    onClick: handleAction
                }
            ]}
        />
    )
}

export default ConfirmationModal