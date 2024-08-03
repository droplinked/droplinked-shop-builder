import { Box, Flex, Image } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
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
        <PaymentLinkCard title='Preview' height={"fit-content"}>
            <Box position="relative" width="fit-content" height="209px" borderRadius={4} overflow="hidden" sx={{ "*": { userSelect: "none" } }}>
                <Image width="fit-content" height="209px" src={getImageForScenario()} objectFit="fill" />
                <Flex
                    position="absolute"
                    inset={0}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                    bgColor="rgba(0, 0, 0, 0.75)"
                    opacity="0"
                    transition="opacity 0.3s ease"
                    cursor={"pointer"}
                    _hover={{ opacity: 1 }}
                    onClick={() => console.log("open modal")}
                >
                    <AppIcons.Maximize />
                    <AppTypography fontSize={16} fontWeight={500} color={"#fff"}>View Preview</AppTypography>
                </Flex>
            </Box>
        </PaymentLinkCard>
    )
}