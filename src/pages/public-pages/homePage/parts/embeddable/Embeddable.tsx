import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { ReactComponent as PaymentIcon } from 'assest/image/homepage/payment.svg';
import { ReactComponent as CryptoIcon } from 'assest/image/homepage/crypto.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import SwiperCore, { Autoplay } from 'swiper/modules';

function Embeddable() {

    const data = [
        {
            image: 'assets/images/homepage/Frame21377.jpg',
            title: 'Caramel Imagination',
            price: '58.00 USD'
        },
        {
            image: 'assets/images/homepage/Frame21328.jpg',
            title: 'ColorWave Handbag',
            price: '39.99 USD'
        }
    ]

    return (
        <Flex justifyContent="center" alignItems="center" gap="100px">
            <VStack align="stretch" width="300px">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={3}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    {data.map((el, key) => (
                        <SwiperSlide key={key}>
                            <VStack align="stretch" borderRadius="24px" background="linear-gradient(#944BFB, #619FE7)" padding="25px" spacing="11px">
                                <Box><Image src={el.image} borderRadius="8px" width="100%" /></Box>
                                <AppTypography size='20px'>{el.title}</AppTypography>
                                <AppTypography size='20px' weight='bolder'>{el.price}</AppTypography>
                                <Flex color="#C2C2C2" padding="10px 10px 10px 40px" alignItems="center" gap="10px" borderRadius="8px" backgroundColor="#292929">
                                    <PaymentIcon />
                                    <AppTypography size='14px' weight='bolder'>Fiat Payment</AppTypography>
                                </Flex>
                                <Flex color="#C2C2C2" padding="10px 10px 10px 40px" alignItems="center" gap="10px" borderRadius="8px" backgroundColor="#292929">
                                    <CryptoIcon />
                                    <AppTypography size='14px' weight='bolder'>Crypto Payment</AppTypography>
                                </Flex>
                            </VStack>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </VStack>
            <VStack width="40%" align="stretch" marginTop="20px">
                <Box><AppTypography size='34px' weight='bolder'>Embeddable Product Card</AppTypography></Box>
                <Box><AppTypography size='20px' color="#888">Semi and fully decentralized product cards to sell anywhere on the web with distributed checkout that reaches your customers wherever they are online</AppTypography></Box>
            </VStack>
        </Flex>
    )
}

export default Embeddable