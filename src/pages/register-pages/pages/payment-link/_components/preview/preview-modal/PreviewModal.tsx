import { Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Slider from "react-slick"
import { PaymentLinkPreviewImage } from '../hooks/usePreviewImages'
import PreviewModalArrows from './PreviewModalArrows'
import PreviewModalScreenSize from './PreviewModalScreenSize'

export type ScreenSize = keyof PaymentLinkPreviewImage

const sliderImages: Array<PaymentLinkPreviewImage> = [
    { desktop: "/assets/images/paymentLink/desktop-quantity.png", mobile: "/assets/images/paymentLink/mobile-quantity.png" },
    { desktop: "/assets/images/paymentLink/desktop-shipping-methods-selection.png", mobile: "/assets/images/paymentLink/mobile-shipping-method-selection.png" },
    { desktop: "/assets/images/paymentLink/desktop-payment-method.png", mobile: "/assets/images/paymentLink/mobile-payment-method.png" },
    { desktop: "/assets/images/paymentLink/desktop-stripe-form.png", mobile: "/assets/images/paymentLink/mobile-stripe-form.png" },
    { desktop: "/assets/images/paymentLink/desktop-payment-success.png", mobile: "/assets/images/paymentLink/mobile-payment-success.png" }
]

interface Props {
    isOpen: boolean
    onClose: () => void
    currentPreviewImages: PaymentLinkPreviewImage
}

export default function PreviewModal({ isOpen, onClose, currentPreviewImages }: Props) {
    const [screenSize, setScreenSize] = useState<ScreenSize>("desktop")
    const sliderRef = useRef<Slider | null>(null)
    const handleNext = () => sliderRef.current?.slickNext()
    const handlePrev = () => sliderRef.current?.slickPrev()

    const sliderSettings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <Modal isOpen={isOpen} isCentered onClose={onClose} size={"6xl"}>
            <ModalOverlay />
            <ModalContent bg="transparent">
                <ModalBody display="flex" flexDirection="column" gap={8}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <PreviewModalScreenSize currentScreenSize={screenSize} onScreenSizeChange={setScreenSize} />
                        <PreviewModalArrows onPrev={handlePrev} onNext={handleNext} />
                    </Flex>
                    <Box
                        flexGrow={1}
                        borderRadius={screenSize === "desktop" ? 8 : 0}
                        overflow="hidden"
                        sx={{ ".slick-slide": { padding: 0 } }}
                    >
                        <Slider ref={sliderRef} {...sliderSettings}>
                            {[currentPreviewImages, ...sliderImages].map((image, index) =>
                                <Image
                                    key={index}
                                    src={image[screenSize]}
                                    objectFit={screenSize === "desktop" ? "unset" : "contain"}
                                    alt={`Slide ${index + 1}`}
                                    width="100%"
                                    height="auto"
                                    maxHeight={{ base: "300px", md: "500px", lg: "600px" }}
                                    mx="auto"
                                />
                            )}
                        </Slider>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}