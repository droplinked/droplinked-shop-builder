import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'
import MainCard from '../parts/card/MainCard'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import classes from './style.module.scss'

function ProductsMain({ loaded }) {
    const data = [
        {
            title: 'Physical Items',
            url: '',
            icon: '/assets/images/homepage/physicalProducts.png'
        },
        {
            title: 'Production on Demand',
            url: '',
            icon: '/assets/images/homepage/pod.png'
        },
        {
            title: 'Digital Goods',
            url: '',
            icon: '/assets/images/homepage/digital.png'
        },
        {
            title: 'Events',
            url: '',
            icon: '/assets/images/homepage/event.png'
        }
    ]

    const checkLoad = useMemo(() => loaded.includes('products'), [loaded])

    return (
        <Box position="relative">
            <Flex justifyContent="center" alignItems="center">
                <VStack width="95%" maxWidth={checkLoad ? "1400px" : "100%"} opacity={checkLoad ? 1 : 0} transition={".7s"} justifyContent="center" color="#FFF">
                    <Box><LandingTitle title='Decentralized Registration of Products' /></Box>
                    <Box padding="10px 0 30px 0"><LandingDescription text='Sell types of products on chain in your customized online store integrated with web3 tools' /></Box>
                    <Flex width="100%" flexWrap={{ base: "wrap", md: "nowrap" }} transition=".7s" justifyContent="center" gap={{ base: "4%", md: checkLoad ? "40px" : "70px", xl: checkLoad ? "64px" : "130px" }}>
                        {data.map((el, key) => (
                            <MainCard key={key}>
                                <VStack justifyContent="center" spacing="40px">
                                    <AppTypography size={{ base: '14px', sm: '16px', xl: '20px' }} color="#f5f5f5">{el.title}</AppTypography>
                                    <Box width="100%" height={{ base: "60px", sm: "130px" }} className={classes.images} position="relative">
                                        <Image width={{ base: "63px", sm: "130px" }} src={el.icon} alt={el.title} />
                                        <Image width={{ base: "63px", sm: "130px" }} src={el.icon} alt={el.title} />
                                    </Box>
                                </VStack>
                            </MainCard>
                        ))}
                    </Flex>
                </VStack>
            </Flex>
        </Box>
    )
}

export default ProductsMain