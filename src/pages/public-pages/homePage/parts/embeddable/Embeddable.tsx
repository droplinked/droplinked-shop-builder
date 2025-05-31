import { Flex, Image, VStack } from '@chakra-ui/react';
import { ReactComponent as CryptoIcon } from 'assets/image/homepage/crypto.svg';
import { ReactComponent as PaymentIcon } from 'assets/image/homepage/payment.svg';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Embeddable() {
    const { t } = useLocaleResources("homePage");

    const data = [
        {
            image: 'assets/images/homepage/Frame21377.jpg',
            titleKey: 'embeddable.products.caramel.title',
            priceKey: 'embeddable.products.caramel.price',
            priceValue: '58.00'
        },
        {
            image: 'assets/images/homepage/Frame21328.jpg',
            titleKey: 'embeddable.products.colorwave.title',
            priceKey: 'embeddable.products.colorwave.price',
            priceValue: '39.99'
        }
    ];

    return (
        <Flex
            justifyContent="center"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems="center"
            height="100%"
            columnGap="100px"
            rowGap="20px"
            position="relative"
        >
            <VStack align="stretch" width="300px">
                <Swiper
                    slidesPerView={1}
                    spaceBetween="16px"
                    modules={[Autoplay]}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    style={{ width: '100%', height: '100%' }}
                >
                    {data.map(({ image, titleKey, priceKey, priceValue }) => (
                        <SwiperSlide key={titleKey}>
                            <VStack
                                align="stretch"
                                borderRadius="24px"
                                background="linear-gradient(#944BFB, #619FE7)"
                                padding="24px"
                                spacing="12px"
                            >
                                <Image src={image} borderRadius="8px" width="100%" />
                                <AppTypography fontSize={{ base: '14px', lg: '20px' }}>
                                    {t(titleKey)}
                                </AppTypography>
                                <AppTypography fontSize={{ base: '14px', lg: '20px' }} fontWeight="bold">
                                    {t(priceKey, { price: priceValue })}
                                </AppTypography>

                                <Flex
                                    color="#C2C2C2"
                                    padding={{ base: '10px', lg: '10px 10px 10px 40px' }}
                                    alignItems="center"
                                    gap="10px"
                                    borderRadius="8px"
                                    backgroundColor="neutral.gray.800"
                                >
                                    <PaymentIcon />
                                    <AppTypography fontSize="14px" fontWeight="bold">
                                        {t('embeddable.fiatPayment')}
                                    </AppTypography>
                                </Flex>

                                <Flex
                                    color="#C2C2C2"
                                    padding={{ base: '10px', lg: '10px 10px 10px 40px' }}
                                    alignItems="center"
                                    gap="10px"
                                    borderRadius="8px"
                                    backgroundColor="neutral.gray.800"
                                >
                                    <CryptoIcon />
                                    <AppTypography fontSize="14px" fontWeight="bold">
                                        {t('embeddable.cryptoPayment')}
                                    </AppTypography>
                                </Flex>
                            </VStack>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </VStack>

            <Flex
                width={{ base: '90%', sm: '60%', lg: '40%' }}
                direction="column"
                gap={{ base: 4, lg: 8 }}
                marginTop="20px"
            >
                <AppTypography
                    textAlign={{ base: 'center', lg: 'left' }}
                    fontSize={{ base: '24px', lg: '32px' }}
                    color="#fff"
                    fontWeight="bold"
                >
                    {t('embeddable.title')}
                </AppTypography>

                <AppTypography
                    textAlign={{ base: 'center', lg: 'left' }}
                    fontSize={{ base: '16px', lg: '20px' }}
                    color="#888"
                >
                    {t('embeddable.description')}
                </AppTypography>
            </Flex>
        </Flex>
    );
}

export default Embeddable;
