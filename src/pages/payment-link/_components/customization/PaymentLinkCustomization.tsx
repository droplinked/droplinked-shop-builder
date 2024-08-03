import { Divider } from '@chakra-ui/react'
import { PaymentLinkContext } from 'pages/payment-link/context/paymentLink.context'
import React, { useContext } from 'react'
import PaymentLinkCard from '../PaymentLinkCard'
import PaymentLinkSwitch from '../PaymentLinkSwitch'
import ColorPalletes from './ColorPalletes'

function PaymentLinkCustomization() {
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)

    return (
        <PaymentLinkCard title='Customization'>
            <PaymentLinkSwitch
                title='Logo Visibility'
                description='Your logo will be on the top left of the page.'
                checked={paymentLinkData.logoVisibility}
                onChange={(checked: boolean) => updatePaymentLink('logoVisibility', checked)}
            />
            <Divider borderColor={"#3C3C3C"} />
            <ColorPalletes />
        </PaymentLinkCard>
    )
}

export default PaymentLinkCustomization