import AppDialog from 'components/common/dialog'
import useAppToast from 'hooks/toast/useToast'
import { IproductDeleteServices } from 'lib/apis/product/interfaces'
import { productDeleteServices } from 'lib/apis/product/productServices'
import React from 'react'
import { useMutation } from 'react-query'

interface IProps {
    open: boolean
    close: Function
    fetch: Function
    productID: string
}
function ConfirmDeleteProduct({ open, close, productID, fetch }: IProps) {
    const { mutate, isLoading } = useMutation((params: IproductDeleteServices) => productDeleteServices(params))
    const { showToast } = useAppToast()

    return (
        <AppDialog
            open={open}
            close={() => { }}
            title="Confirm Product Deletion ?"
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => close(),
                    buttonProps: {
                        variant: "outline"
                    }
                },
                {
                    children: "Delete Product",
                    buttonProps: { isLoading },
                    onClick: () => {
                        mutate({ productID }, {
                            onSuccess: () => {
                                showToast("Delete product", "success")
                                fetch()
                                close()
                            },
                            onError: async () => showToast("Oops! Something went wrong", "error")
                        })
                    }
                }
            ]}
        />
    )
}

export default ConfirmDeleteProduct