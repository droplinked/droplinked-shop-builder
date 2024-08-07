import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import { PaymentLinkContext, PaymentLinkData } from '../../context/paymentLink.context'
import PaymentLinkCard from '../PaymentLinkCard'
import PreviewModal from './preview-modal/PreviewModal'

export default function PaymentLinkPreview() {
    const { paymentLinkData } = useContext(PaymentLinkContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const currentPreviewImage = getImageForScenario(paymentLinkData)

    return (
        <>
            <PaymentLinkCard title='Preview' height={"fit-content"} flexShrink={0}>
                <Box position="relative" width="fit-content" height="209px" borderRadius={4} overflow="hidden" sx={{ "*": { userSelect: "none" } }}>
                    <Image width="350px" height="209px" src={currentPreviewImage} objectFit="fill" />
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
                        onClick={onOpen}
                    >
                        <AppIcons.Maximize />
                        <AppTypography fontSize={16} fontWeight={500} color={"#fff"}>View Preview</AppTypography>
                    </Flex>
                </Box>
            </PaymentLinkCard>
            {isOpen && <PreviewModal isOpen={isOpen} onClose={onClose} currentPreviewImage={currentPreviewImage} />}
        </>
    )
}

const getImageForScenario = (paymentLinkData: PaymentLinkData) => {
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