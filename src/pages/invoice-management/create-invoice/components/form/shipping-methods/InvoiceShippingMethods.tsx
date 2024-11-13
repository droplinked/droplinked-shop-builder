import { useFormikContext } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { addAddressToCartService, createAddressService } from 'lib/apis/invoice/invoiceServices'
import { deepEqual } from 'lib/utils/helpers/helpers'
import { InvoiceFormSchema } from 'pages/invoice-management/create-invoice/helpers/helpers'
import useCreateInvoice from 'pages/invoice-management/create-invoice/hooks/useCreateInvoice'
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React, { useEffect, useState } from 'react'
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

    const activateSwitch = async () => {
        const validationResult = await validateForm()
        if (Object.entries(validationResult).length > 0) return
        if (!isInvoiceDataValid(values)) return
        setExpanded(true)
        updateInvoice()
    }

    function renderContent() {
        if (isLoading) return <ShippingMethodsLoading />
        if (!cart.shippings?.length) return null
        return <ShippingMethodList />
    }

    async function updateInvoice() {
        const { _id, easyPostAddressID, ...rest } = cart.address ?? {}

        if ((isEditMode && !deepEqual(rest, values.address)) || (isExpanded && !cart.address)) {
            try {
                setLoading(true)
                const { data: createdAddress } = await createAddressService(values.address)
                const { data } = await addAddressToCartService(cart._id, createdAddress._id)
                updateCart(data)
                updateShippingMethod(null)
            }
            catch (error) {
                if (error.response) showToast({ message: error.response.data.data.message, type: "error" })
                else showToast({ message: (error as Error).message, type: "error" })
                setExpanded(false)
            }
            finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        const { _id, easyPostAddressID, ...rest } = cart.address ?? {}
        if (!deepEqual(rest, values.address)) setExpanded(false)
    }, [values.address])

    return (
        <ToggleableSection
            title='Shipping'
            description='Shipping methods are based on the type of inventory and address on the invoice.'
            isExpanded={isExpanded}
            onToggle={isExpanded ? () => setExpanded(false) : activateSwitch}
        >
            {renderContent()}
        </ToggleableSection>
    )
}