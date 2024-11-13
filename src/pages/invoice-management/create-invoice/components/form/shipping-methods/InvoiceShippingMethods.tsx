import { Flex, useRadioGroup } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { addAddressToCartService, createAddressService } from 'lib/apis/invoice/invoiceServices'
import { deepEqual } from 'lib/utils/helpers/helpers'
import { InvoiceFormSchema } from 'pages/invoice-management/create-invoice/helpers/helpers'
import useCreateInvoice from 'pages/invoice-management/create-invoice/hooks/useCreateInvoice'
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React, { useEffect, useState } from 'react'
import ToggleableSection from '../../ToggleableSection'
import ShippingMethodRadio from './ShippingMethodRadio'
import ShippingMethodsLoading from './ShippingMethodsLoading'

export default function InvoiceShippingMethods() {
    const { cart, updateCart, selectedShippingMethod, updateShippingMethod, isEditMode } = useInvoiceStore()
    const [isLoading, setLoading] = useState(false)
    const [isExpanded, setExpanded] = useState(!!selectedShippingMethod)
    const { values, validateForm } = useFormikContext<InvoiceFormSchema>()
    const { isInvoiceDataValid } = useCreateInvoice({ trigger: "SHIPPING_METHODS_SWITCH" })
    const { showToast } = useAppToast()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-payment-method',
        onChange: (shppingMethodId: string) => {
            const shippingGroup = cart.shippings.find(group => group.data.some(method => method.id === shppingMethodId))
            updateShippingMethod({ groupId: shippingGroup.groupId, shipmentId: shppingMethodId })
        },
        value: selectedShippingMethod?.shipmentId,
    })

    const handleToggle = async () => {
        const validationResult = await validateForm()
        if (Object.entries(validationResult).length > 0) return
        if (!isInvoiceDataValid(values)) return
        setExpanded(true)
    }

    const renderContent = () => {
        if (isLoading) return <ShippingMethodsLoading />
        if (!cart.shippings?.length) return null
        return (
            <Flex direction="column" gap={4} {...getRootProps()}>
                {cart?.shippings.map((shippingGroup) => (
                    shippingGroup.data.map((shippingMethod) => (
                        <ShippingMethodRadio
                            key={shippingMethod.id}
                            method={shippingMethod}
                            {...getRadioProps({ value: shippingMethod.id })}
                        />
                    ))
                ))}
            </Flex>
        )
    }

    useEffect(() => {
        (async () => {
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
        })()
    }, [isExpanded])

    useEffect(() => {
        const { _id, easyPostAddressID, ...rest } = cart.address ?? {}
        if (!deepEqual(rest, values.address)) setExpanded(false)
    }, [values.address])

    return (
        <ToggleableSection
            title='Shipping'
            description='Shipping methods are based on the type of inventory and address on the invoice.'
            isExpanded={isExpanded}
            onToggle={isExpanded ? () => setExpanded(false) : handleToggle}
        >
            {renderContent()}
        </ToggleableSection>
    )
}