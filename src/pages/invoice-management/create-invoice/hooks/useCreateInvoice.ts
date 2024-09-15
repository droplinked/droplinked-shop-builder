import useAppToast from 'functions/hooks/toast/useToast'
import { createAddressService } from 'lib/apis/address/addressServices'
import { addAdditionalDetailsToCartService, addAddressToCartService, addShippingMethodToCartService } from 'lib/apis/invoice/invoiceServices'
import { useState } from 'react'
import useInvoiceStore from '../store/invoiceStore'

interface Props {
    trigger: "CREATE_BUTTON" | "SHIPPING_METHODS_SWITCH"
    formData: any
    onSuccess?: () => void
}

export default function useCreateInvoice() {
    const [isLoading, setLoading] = useState(false)
    const { cart, updateCart, areAllProductsDigital, selectedShippingMethod } = useInvoiceStore()
    const { showToast } = useAppToast()

    const createInvoice = async ({ trigger, formData, onSuccess }: Props) => {
        try {
            setLoading(true)
            if (!cart._id)
                throw new Error("You have to add products to the cart first")

            if (trigger === "CREATE_BUTTON" && !selectedShippingMethod)
                throw new Error("Please select a shipping method")

            const { data } = await addAdditionalDetailsToCartService(cart._id, { email: formData.email, note: formData.note })
            updateCart(data)

            if (!areAllProductsDigital) {
                const { data: { data: createdAddress } } = await createAddressService(formData.address)
                const { data } = await addAddressToCartService(cart._id, createdAddress._id)
                updateCart(data)

                if (trigger === "CREATE_BUTTON") {
                    const { data } = await addShippingMethodToCartService(cart._id, selectedShippingMethod)
                    updateCart(data)
                }
            }

            if (trigger === "CREATE_BUTTON") onSuccess?.()
        }
        catch (error: any) {
            if (error.response) {
                showToast({ message: error.response.data.data.message, type: "error" })
                return
            }
            showToast({ message: (error as Error).message, type: "error" })
        }
        finally {
            setLoading(false)
        }
    }

    return { createInvoice, isLoading }
}