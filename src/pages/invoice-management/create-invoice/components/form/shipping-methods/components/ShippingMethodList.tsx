import { Flex, useRadioGroup } from '@chakra-ui/react'
import useInvoiceStore from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React from 'react'
import ShippingMethodRadio from './ShippingMethodRadio'

function ShippingMethodList() {
    const { cart, selectedShippingMethod, updateShippingMethod } = useInvoiceStore()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-payment-method',
        onChange: (shppingMethodId: string) => {
            const shippingGroup = cart.shippings.find(group => group.data.some(method => method.id === shppingMethodId))
            updateShippingMethod({ groupId: shippingGroup.groupId, shipmentId: shppingMethodId })
        },
        value: selectedShippingMethod?.shipmentId,
    })

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

export default ShippingMethodList