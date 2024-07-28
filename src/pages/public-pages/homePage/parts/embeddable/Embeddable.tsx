import { Flex, Image, VStack } from '@chakra-ui/react';
import { ReactComponent as CryptoIcon } from 'assest/image/homepage/crypto.svg';
import { ReactComponent as PaymentIcon } from 'assest/image/homepage/payment.svg';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Embeddable() {

    const data = [
        {
            image: 'assets/images/homepage/Frame21377.jpg',
            title: 'Caramel Imagination',
            price: '$58.00 USD'
        },
        {
            image: 'assets/images/homepage/Frame21328.jpg',
            title: 'ColorWave Handbag',
            price: '$39.99 USD'
        }
    ]

    return (
        <Flex justifyContent="center" flexDirection={{ base: "column", lg: "row" }} alignItems="center" height="100%" columnGap="100px" rowGap="20px" position="relative">
            <VStack align="stretch" width={"300px"}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={"16px"}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    {data.map((el, key) => (
                        <SwiperSlide key={key}>
                            <VStack align="stretch" borderRadius={"24px"} background="linear-gradient(#944BFB, #619FE7)" padding={"24px"} spacing="12px">
                                <Image src={el.image} borderRadius="8px" width="100%" />
                                <AppTypography fontSize={{ base: "14px", lg: "20px" }}>{el.title}</AppTypography>
                                <AppTypography fontSize={{ base: "14px", lg: "20px" }} fontWeight='bold'>{el.price}</AppTypography>
                                <Flex color="#C2C2C2" padding={{ base: "10px", lg: "10px 10px 10px 40px" }} alignItems="center" gap="10px" borderRadius="8px" backgroundColor="#292929">
                                    <PaymentIcon />
                                    <AppTypography fontSize='14px' fontWeight='bold'>Fiat Payment</AppTypography>
                                </Flex>
                                <Flex color="#C2C2C2" padding={{ base: "10px", lg: "10px 10px 10px 40px" }} alignItems="center" gap="10px" borderRadius="8px" backgroundColor="#292929">
                                    <CryptoIcon />
                                    <AppTypography fontSize='14px' fontWeight='bold'>Crypto Payment</AppTypography>
                                </Flex>
                            </VStack>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </VStack>
            <Flex width={{ base: "90%", sm: "60%", lg: "40%" }} direction={"column"} gap={{ base: 4, lg: 8 }} marginTop="20px">
                <AppTypography textAlign={{ base: "center", lg: "left" }} fontSize={{ base: "24px", lg: "32px" }} color={"#fff"} fontWeight='bold'>Embeddable Product Cards</AppTypography>
                <AppTypography textAlign={{ base: "center", lg: "left" }} fontSize={{ base: "16px", lg: "20px" }} color="#888">Semi and fully decentralized product cards to sell anywhere on the web with stand alone checkout to reach customers wherever they are</AppTypography>
            </Flex>
        </Flex>
    )
}

export default Embeddable