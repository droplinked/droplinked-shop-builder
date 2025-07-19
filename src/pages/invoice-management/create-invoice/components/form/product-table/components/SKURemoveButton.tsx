import { Spinner, Td } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { DeleteInvoiceProduct } from 'services/invoice/interfaces'
import { removeProductFromCartService } from 'services/invoice/invoiceServices'
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React from 'react'
import { useMutation } from 'react-query'

function SKURemoveButton({ itemId }: { itemId: string }) {
    const { cart, updateCart } = useInvoiceStore()
    const { isLoading, mutateAsync: removeProduct } = useMutation({
        mutationFn: (data: DeleteInvoiceProduct) => removeProductFromCartService(data),
        onSuccess: (response) => updateCart(response.data)
    })

    return (
        <Td>
            {isLoading ?
                <Spinner size='sm' color="#FF2244" /> :
                <button
                    type="button"
                    onClick={() => removeProduct({ cartId: cart._id, itemId })}
                >
                    <AppIcons.RedTrash />
                </button>
            }
        </Td>
    )
}

export default SKURemoveButton