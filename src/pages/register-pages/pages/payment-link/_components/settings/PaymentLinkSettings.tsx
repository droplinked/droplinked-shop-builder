import { Divider } from '@chakra-ui/react'
import { PaymentLinkContext } from 'pages/register-pages/pages/payment-link/context/paymentLink.context'
import React, { useContext } from 'react'
import PaymentLinkCard from '../PaymentLinkCard'
import PaymentLinkSwitch from '../PaymentLinkSwitch'
import VariantsStyle from './VariantsStyle'

function PaymentLinkSettings() {
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)

    return (
        <PaymentLinkCard title='Settings'>
            <VariantsStyle />
            <Divider borderColor={"#3C3C3C"} />
            <PaymentLinkSwitch
                title='Additional Note'
                description='Enable this if you want users to be able to write an order note or give any additional information.'
                checked={paymentLinkData.additionalNote}
                onChange={(checked: boolean) => updatePaymentLink('additionalNote', checked)}
            />
        </PaymentLinkCard>
    )
}

export default PaymentLinkSettings