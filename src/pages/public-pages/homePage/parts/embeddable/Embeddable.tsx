import { Box, Flex, Image, VStack } from '@chakra-ui/react';
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
            <VStack align="stretch" width={{ base: "200px", lg: "300px" }}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={"17px"}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    {data.map((el, key) => (
                        <SwiperSlide key={key}>
                            <VStack align="stretch" borderRadius={{ base: "14px", lg: "24px" }} background="linear-gradient(#944BFB, #619FE7)" padding={{ base: "10px", lg: "25px" }} spacing="11px">
                                <Box><Image src={el.image} borderRadius="8px" width="100%" /></Box>
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
            <VStack width={{ base: "90%", sm: "60%", lg: "40%" }} align="stretch" marginTop="20px">
                <Box><AppTypography textAlign={{ base: "center", lg: "left" }} fontSize={{ base: "18px", sm: "23px", lg: "34px" }} color={"#fff"} fontWeight='bold'>Embeddable Product Cards</AppTypography></Box>
                <Box><AppTypography textAlign={{ base: "center", lg: "left" }} fontSize={{ base: "14px", sm: "18px", lg: "20px" }} color="#888">Semi and fully decentralized product cards to sell anywhere on the web with stand alone checkout to reach customers wherever they are</AppTypography></Box>
            </VStack>
        </Flex>
    )
}

export default Embeddable