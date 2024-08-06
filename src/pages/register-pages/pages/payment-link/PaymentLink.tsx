import { Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import PaymentLinkSubmit from './_components/PaymentLinkSubmit'
import PaymentLinkCustomization from './_components/customization/PaymentLinkCustomization'
import PaymentLinkPreview from './_components/preview/PaymentLinkPreview'
import PaymentLinkSettings from './_components/settings/PaymentLinkSettings'
import PaymentLinkProvider from './context/paymentLink.context'

function PaymentLink() {
    const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')

    return (
        <PaymentLinkProvider>
            <Flex direction={isLargerThan1200 ? "row" : "column"} gap={6}>
                <Flex direction={"column"} flexGrow={1} gap={6}>
                    <PaymentLinkSettings />
                    <PaymentLinkCustomization />
                    {isLargerThan1200 && <PaymentLinkSubmit />}
                </Flex>
                <PaymentLinkPreview />
                {!isLargerThan1200 && <PaymentLinkSubmit />}
            </Flex>
        </PaymentLinkProvider>
    )
}

export default PaymentLink