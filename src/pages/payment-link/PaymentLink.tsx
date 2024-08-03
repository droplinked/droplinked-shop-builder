import { Flex } from '@chakra-ui/react'
import React from 'react'
import PaymentLinkCustomization from './_components/customization/PaymentLinkCustomization'
import PaymentLinkPreview from './_components/preview/PaymentLinkPreview'
import PaymentLinkSettings from './_components/settings/PaymentLinkSettings'
import PaymentLinkProvider from './context/paymentLink.context'

function PaymentLink() {
    return (
        <PaymentLinkProvider>
            <Flex wrap={"wrap"} gap={6}>
                <Flex direction={"column"} flexGrow={1} gap={6}>
                    <PaymentLinkSettings />
                    <PaymentLinkCustomization />
                </Flex>
                <PaymentLinkPreview />
            </Flex>
        </PaymentLinkProvider>
    )
}

export default PaymentLink