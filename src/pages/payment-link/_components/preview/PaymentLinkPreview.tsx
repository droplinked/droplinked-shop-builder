import { Image } from '@chakra-ui/react'
import { PaymentLinkContext } from 'pages/payment-link/context/paymentLink.context'
import React, { useContext } from 'react'
import PaymentLinkCard from '../PaymentLinkCard'

export default function PaymentLinkPreview() {
    const { paymentLinkData } = useContext(PaymentLinkContext)

    const getImageForScenario = () => {
        const { variantsStyle, additionalNote, logoVisibility } = paymentLinkData
        if (variantsStyle === "DROPDOWN" && !additionalNote && !logoVisibility) return "/assets/images/paymentLink/scenario1.png"
        if (variantsStyle === "DROPDOWN" && !additionalNote && logoVisibility) return "/assets/images/paymentLink/scenario2.png"
        if (variantsStyle === "DROPDOWN" && additionalNote && !logoVisibility) return "/assets/images/paymentLink/scenario3.png"
        if (variantsStyle === "DROPDOWN" && additionalNote && logoVisibility) return "/assets/images/paymentLink/scenario4.png"
        if (variantsStyle === "SELECTOR" && !additionalNote && !logoVisibility) return "/assets/images/paymentLink/scenario5.png"
        if (variantsStyle === "SELECTOR" && !additionalNote && logoVisibility) return "/assets/images/paymentLink/scenario6.png"
        if (variantsStyle === "SELECTOR" && additionalNote && !logoVisibility) return "/assets/images/paymentLink/scenario7.png"
        if (variantsStyle === "SELECTOR" && additionalNote && logoVisibility) return "/assets/images/paymentLink/scenario8.png"
        return "/assets/images/paymentLink/scenario1.png"
    }

    return (
        <PaymentLinkCard title='Preview' height={"fit-content"} flexGrow={1}>
            <Image width={"fit-content"} height={"209px"} src={getImageForScenario()} objectFit={"fill"} borderRadius={4} onClick={() => { }} />
        </PaymentLinkCard>
    )
}