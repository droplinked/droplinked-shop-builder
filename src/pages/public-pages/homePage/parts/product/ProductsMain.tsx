import { Box, Flex, Image, VStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import MainCard from '../parts/card/MainCard';
import LandingDescription from '../parts/description/LandingDescription';
import LandingTitle from '../parts/title/LandingTitle';
import classes from './style.module.scss';

function ProductsMain() {
    const { t } = useLocaleResources("homePage");

    const data = [
        { key: 'physical', icon: '/assets/images/homepage/physicalProducts.png' },
        { key: 'pod', icon: '/assets/images/homepage/pod.png' },
        { key: 'digital', icon: '/assets/images/homepage/digital.png' },
        { key: 'events', icon: '/assets/images/homepage/event.png' }
    ];

    return (
        <Flex maxWidth="100%" direction="column" gap={5}>
            <LandingTitle title={t('productsMain.title')} />
            <LandingDescription text={t('productsMain.description')} />

            <Flex
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
                transition=".7s"
                justifyContent="center"
                gap={{ base: '4%', md: '20px', xl: '56px' }}
            >
                {data.map(({ key, icon }) => (
                    <MainCard key={key}>
                        <VStack justifyContent="center" spacing={{ base: '12px', lg: '40px' }}>
                            <AppTypography
                                textAlign="center"
                                height={{ base: '40px', sm: '32px', md: '40px', lg: 'auto' }}
                                fontSize={{ base: '14px', sm: '16px', xl: '20px' }}
                                color="#f5f5f5"
                            >
                                {t(`productsMain.cards.${key}`)}
                            </AppTypography>

                            <Box
                                width="100%"
                                height={{ base: '60px', sm: '130px' }}
                                className={classes.images}
                                position="relative"
                            >
                                <Image width={{ base: '63px', sm: '90px', lg: '130px' }} src={icon} alt={key} />
                                <Image width={{ base: '63px', sm: '90px', lg: '130px' }} src={icon} alt={key} />
                            </Box>
                        </VStack>
                    </MainCard>
                ))}
            </Flex>
        </Flex>
    );
}

export default ProductsMain;
