import { Flex } from '@chakra-ui/react'
import React from 'react'
import PaymentLinkSubmit from './_components/PaymentLinkSubmit'
import PaymentLinkCustomization from './_components/customization/PaymentLinkCustomization'
import PaymentLinkPreview from './_components/preview/PaymentLinkPreview'
import PaymentLinkSettings from './_components/settings/PaymentLinkSettings'
import PaymentLinkProvider from './context/paymentLink.context'

function PaymentLink() {
    return (
        <PaymentLinkProvider>
            <Flex direction={{ base: "column", xl: "row" }} gap={6}>
                <Flex direction={"column"} flexGrow={1} gap={6}>
                    <PaymentLinkSettings />
                    <PaymentLinkCustomization />
                    <PaymentLinkSubmit display={{ base: "none", xl: "flex" }} />
                </Flex>
                <PaymentLinkPreview />
                <PaymentLinkSubmit display={{ base: "flex", xl: "none" }} />
            </Flex>
        </PaymentLinkProvider>
    )
}

export default PaymentLink