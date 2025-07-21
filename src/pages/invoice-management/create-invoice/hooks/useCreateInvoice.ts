import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import { addAdditionalDetailsToCartService, addAddressToCartService, addShippingMethodToCartService, createAddressService } from 'services/invoice/invoiceServices'
import { areObjectsEqual } from 'utils/helpers'
import { phone } from "phone"
import { useState } from 'react'
import { findSelectedShippingMethod } from '../helpers/helpers'
import useInvoiceStore from '../store/invoiceStore'

interface Props {
    trigger: "CREATE_BUTTON" | "SHIPPING_METHODS_SWITCH"
    onSuccess?: () => void
}

export default function useCreateInvoice({ trigger, onSuccess }: Props) {
    const [isLoading, setLoading] = useState(false)
    const { cart, updateCart, isAddressSwitchToggled, countryISO2, selectedShippingMethod } = useInvoiceStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })

    const isInvoiceDataValid = (formData: any) => {
        if (!cart._id) return showToast({ message: t('useCreateInvoice.errors.addProductsFirst'), type: "error" })

        if (trigger === "SHIPPING_METHODS_SWITCH") {
            const { addressLine1, city, state, zip, country } = formData.address ?? {}
            const allFieldsPresent = [addressLine1, city, state, zip, country].every(Boolean)
            if (!allFieldsPresent) {
                return showToast({ message: t('useCreateInvoice.errors.provideValidAddress'), type: "error" })
            }
        }

        return true
    }

    const validatePhoneNumber = (formData: any) => {
        const { isValid, phoneNumber } = phone(formData.address.phoneNumber, { country: countryISO2 })
        if (!isValid) throw new Error(t('useCreateInvoice.errors.validPhoneNumber'))
        formData.address.phoneNumber = phoneNumber
    }

    const addAdditionalDetailsToCart = async (formData: any) => {
        const { data } = await addAdditionalDetailsToCartService(cart._id, { email: formData.email, note: formData.note })
        updateCart(data)
    }

    const createAddressAndAddToCart = async (formData: any) => {
        const { data: createdAddress } = await createAddressService(formData.address)
        const { data } = await addAddressToCartService(cart._id, createdAddress._id)
        updateCart(data)
    }

    const addShippingMethodToCart = async () => {
        const { data } = await addShippingMethodToCartService(cart._id, selectedShippingMethod)
        updateCart(data)
    }

    const createInvoice = async (formData: any) => {
        try {
            setLoading(true)
            // validatePhoneNumber(formData)
            await addAdditionalDetailsToCart(formData)

            if (isAddressSwitchToggled && !cart.address)
                await createAddressAndAddToCart(formData)

            if (trigger === "CREATE_BUTTON") {
                if (cart.address && selectedShippingMethod?.shipmentId) await addShippingMethodToCart()
                onSuccess?.()
            }
        }
        catch (error) {
            if (error.response) showToast({ message: error.response.data.data.message, type: "error" })
            else showToast({ message: (error as Error).message, type: "error" })
        }
        finally {
            setLoading(false)
        }
    }

    const updateInvoice = async (formData: any) => {
        try {
            setLoading(true)
            // validatePhoneNumber(formData)
            await addAdditionalDetailsToCart(formData)

            const { _id, easyPostAddressID, ...rest } = cart.address ?? {}
            if (!areObjectsEqual(rest, formData.address)) await createAddressAndAddToCart(formData)

            const prevSelectedMethod = findSelectedShippingMethod(cart.shippings)
            if (!areObjectsEqual(prevSelectedMethod, selectedShippingMethod)) await addShippingMethodToCart()

            onSuccess?.()
        }
        catch (error) {
            if (error.response) showToast({ message: error.response.data.data.message, type: "error" })
            else showToast({ message: (error as Error).message, type: "error" })
        }
        finally {
            setLoading(false)
        }
    }

    return {
        isInvoiceDataValid,
        createInvoice,
        updateInvoice,
        isLoading
    }
}