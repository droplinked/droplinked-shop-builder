import { Divider } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { PaymentLinkContext } from '../../context/PaymentLinkContext'
import PaymentLinkCard from '../PaymentLinkCard'
import PaymentLinkSwitch from '../PaymentLinkSwitch'
import VariantsStyle from './VariantsStyle'

function PaymentLinkSettings() {
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)

    return (
        <PaymentLinkCard title='Settings'>
            <VariantsStyle />
            <Divider borderColor={"neutral.gray.700"} />
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