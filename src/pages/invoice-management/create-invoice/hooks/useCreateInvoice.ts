import useAppToast from 'functions/hooks/toast/useToast'
import { createAddressService } from 'lib/apis/address/addressServices'
import { addAdditionalDetailsToCartService, addAddressToCartService, addShippingMethodToCartService } from 'lib/apis/invoice/invoiceServices'
import { phone } from "phone"
import { useState } from 'react'
import useInvoiceStore from '../store/invoiceStore'

interface Props {
    trigger: "CREATE_BUTTON" | "SHIPPING_METHODS_SWITCH"
    onSuccess?: () => void
}

export default function useCreateInvoice({ trigger, onSuccess }: Props) {
    const [isLoading, setLoading] = useState(false)
    const { cart, updateCart, areAllProductsDigital, selectedShippingMethod, countryISO2 } = useInvoiceStore()
    const { showToast } = useAppToast()

    const isInvoiceDataValid = (formData: any) => {
        if (!cart._id) {
            showToast({ message: "You have to add products to the cart first", type: "error" })
            return false
        }

        if (!areAllProductsDigital) {
            const { isValid, phoneNumber } = phone(formData.address.phoneNumber, { country: countryISO2 })
            if (isValid) formData.address.phoneNumber = phoneNumber
            else {
                showToast({ message: "Please enter a valid phone number", type: "error" })
                return false
            }
        }

        if (trigger === "CREATE_BUTTON" && !selectedShippingMethod) {
            showToast({ message: "Please select a shipping method", type: "error" })
            return false
        }

        return true
    }

    const createInvoice = async (formData: any) => {
        try {
            setLoading(true)

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
        catch (error) {
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

    return { isInvoiceDataValid, createInvoice, isLoading }
}