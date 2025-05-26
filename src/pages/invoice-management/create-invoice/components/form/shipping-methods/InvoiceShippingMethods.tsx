import { useFormikContext } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { addAddressToCartService, createAddressService } from 'services/invoice/invoiceServices'
import { areObjectsEqual } from 'utils/helpers'
import { InvoiceFormSchema } from 'pages/invoice-management/create-invoice/helpers/helpers'
import useCreateInvoice from 'pages/invoice-management/create-invoice/hooks/useCreateInvoice'
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React, { useCallback, useEffect, useState } from 'react'
import ToggleableSection from '../../ToggleableSection'
import ShippingMethodList from './components/ShippingMethodList'
import ShippingMethodsLoading from './components/ShippingMethodsLoading'

export default function InvoiceShippingMethods() {
    const { cart, updateCart, selectedShippingMethod, updateShippingMethod, isEditMode } = useInvoiceStore()
    const [isLoading, setLoading] = useState(false)
    const [isExpanded, setExpanded] = useState(!!selectedShippingMethod)
    const { values, validateForm } = useFormikContext<InvoiceFormSchema>()
    const { isInvoiceDataValid } = useCreateInvoice({ trigger: "SHIPPING_METHODS_SWITCH" })
    const { showToast } = useAppToast()

    const validateAndActivate = async () => {
        const validationErrors = await validateForm()
        if (Object.keys(validationErrors).length > 0 || !isInvoiceDataValid(values)) return
        setExpanded(true)
        await updateInvoice()
    }

    const updateInvoice = useCallback(async () => {
        const { _id, easyPostAddressID, ...addressDetails } = cart.address ?? {}

        if ((isEditMode && !areObjectsEqual(addressDetails, values.address)) || (isExpanded && !cart.address)) {
            setLoading(true)
            try {
                const { data: createdAddress } = await createAddressService(values.address)
                const { data: updatedCart } = await addAddressToCartService(cart._id, createdAddress._id)
                updateCart(updatedCart)
                updateShippingMethod(null)
            } catch (error) {
                const errorMessage = error.response?.data?.data?.message || error.message
                showToast({ message: errorMessage, type: "error" })
                setExpanded(false)
            } finally {
                setLoading(false)
            }
        }
    }, [cart.address, isEditMode, values.address, isExpanded, updateCart, updateShippingMethod, showToast])

    useEffect(() => {
        const { _id, easyPostAddressID, ...addressDetails } = cart.address ?? {}
        setExpanded(areObjectsEqual(addressDetails, values.address))
    }, [cart.address, values.address])

    const renderContent = () => {
        if (isLoading) return <ShippingMethodsLoading />
        return cart.shippings?.length ? <ShippingMethodList /> : null
    }

    return (
        <ToggleableSection
            title='Shipping'
            description='Shipping methods are based on the type of inventory and address on the invoice.'
            isExpanded={isExpanded}
            onToggle={isExpanded ? () => setExpanded(false) : validateAndActivate}
        >
            {renderContent()}
        </ToggleableSection>
    )
}