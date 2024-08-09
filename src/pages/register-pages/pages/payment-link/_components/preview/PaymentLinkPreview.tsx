import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import { PaymentLinkContext, PaymentLinkData } from '../../context/PaymentLinkContext'
import PaymentLinkCard from '../PaymentLinkCard'
import PreviewModal from './preview-modal/PreviewModal'

export interface PaymentLinkPreviewImage {
    desktop: string;
    mobile: string;
}

export default function PaymentLinkPreview() {
    const { paymentLinkData } = useContext(PaymentLinkContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const currentPreviewImages = getImageForScenario(paymentLinkData)

    return (
        <>
            <PaymentLinkCard title='Preview' height={"fit-content"} flexShrink={0}>
                <Box position="relative" width="fit-content" height="auto" borderRadius={4} overflow="hidden" sx={{ "*": { userSelect: "none" } }}>
                    <Image width="300px" src={currentPreviewImages.desktop} objectFit="cover" />
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
            {isOpen && <PreviewModal isOpen={isOpen} onClose={onClose} currentPreviewImages={currentPreviewImages} />}
        </>
    )
}

const getImageForScenario = (paymentLinkData: PaymentLinkData): PaymentLinkPreviewImage => {
    const { variantsStyle, additionalNote } = paymentLinkData
    if (variantsStyle === "DROPDOWN" && !additionalNote)
        return { desktop: "/assets/images/paymentLink/desktop-dropdown.png", mobile: "/assets/images/paymentLink/mobile-dropdown.png" }
    if (variantsStyle === "DROPDOWN" && additionalNote)
        return { desktop: "/assets/images/paymentLink/desktop-dropdown-note.png", mobile: "/assets/images/paymentLink/mobile-dropdown.png" }
    if (variantsStyle === "SELECTOR" && !additionalNote)
        return { desktop: "/assets/images/paymentLink/desktop-selector.png", mobile: "/assets/images/paymentLink/mobile-selector.png" }
    if (variantsStyle === "SELECTOR" && additionalNote)
        return { desktop: "/assets/images/paymentLink/desktop-selector-note.png", mobile: "/assets/images/paymentLink/mobile-selector.png" }
}