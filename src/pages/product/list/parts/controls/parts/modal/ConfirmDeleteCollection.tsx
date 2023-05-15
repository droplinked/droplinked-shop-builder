import AppDialog from 'components/shared/dialog'
import { IproductDeleteServices } from 'lib/apis/product/interfaces'
import { productDeleteServices } from 'lib/apis/product/productServices'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

interface IProps {
    open: boolean
    close: Function
    fetch: Function
    productID: string
}
function ConfirmDeleteProduct({ open, close, productID, fetch }: IProps) {
    const { mutate, isLoading } = useMutation((params: IproductDeleteServices) => productDeleteServices(params))

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
                                toast.success("Delete product")
                                fetch()
                                close()
                            },
                            onError: async () => toast.error("Somthing wrong")
                        })
                    }
                }
            ]}
        />
    )
}

export default ConfirmDeleteProduct