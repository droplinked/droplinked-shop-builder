import { Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PreviewModalArrows from './PreviewModalArrows';
import PreviewModalScreenSize from './PreviewModalScreenSize';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentPreviewImage: string
}

export type ScreenSize = "DESKTOP" | "MOBILE"

export default function PreviewModal({ isOpen, onClose, currentPreviewImage }: Props) {
    const [screenSize, setScreenSize] = useState<ScreenSize>("DESKTOP")
    const sliderRef = useRef<Slider | null>(null)
    const handleNext = () => sliderRef.current?.slickNext()
    const handlePrev = () => sliderRef.current?.slickPrev()
    const images = [
        currentPreviewImage,
        "/assets/images/paymentLink/payment-link-shipping-methods.png",
        "/assets/images/paymentLink/payment-link-payment.png",
        "/assets/images/paymentLink/payment-link-discount-applied.png",
        "/assets/images/paymentLink/payment-link-result.png"
    ]

    const settings = {
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
            <ModalContent bg={"transparent"}>
                <ModalBody display={"flex"} flexDirection={"column"} gap={8}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <PreviewModalScreenSize currentScreenSize={screenSize} onChange={setScreenSize} />
                        <PreviewModalArrows onPrev={handlePrev} onNext={handleNext} />
                    </Flex>
                    <Box flexGrow={1} borderRadius={8} overflow={"hidden"} sx={{ ".slick-slide": { padding: 0 } }}>
                        <Slider ref={sliderRef} {...settings}>
                            {images.map((image, index) => <Image key={index} src={image} alt={`Slide ${index + 1}`} />)}
                        </Slider>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}