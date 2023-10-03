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
        <Flex alignItems="center" justifyContent="center" height="100%">
            <Box position="relative">
                <Flex justifyContent="center" alignItems="center">
                    <VStack maxWidth={checkLoad ? "1400px" : "100%"} opacity={checkLoad ? 1 : 0} transition={".7s"} justifyContent="center" color="#FFF">
                        <Box><LandingTitle title='Decentralized Registration of Products' /></Box>
                        <Box padding="10px 0 30px 0"><LandingDescription text='Start selling today with a customizable storefront paired with web3 tools for on-chain transparency' /></Box>
                        <Flex width="100%" maxWidth={{ base: "500px", md: "100%" }} flexWrap={{ base: "wrap", md: "nowrap" }} transition=".7s" justifyContent="center" gap={{ base: "4%", md: checkLoad ? "20px" : "70px", xl: checkLoad ? "56px" : "130px" }}>
                            {data.map((el, key) => (
                                <MainCard key={key}>
                                    <VStack justifyContent="center" spacing={{ base: "10px", lg: "40px" }}>
                                        <AppTypography textAlign="center" height={{ base: "42px", sm: "30px", md: "40px", lg: "auto" }} size={{ base: '14px', sm: '16px', xl: '20px' }} color="#f5f5f5">{el.title}</AppTypography>
                                        <Box width="100%" height={{ base: "60px", sm: "130px" }} className={classes.images} position="relative">
                                            <Image width={{ base: "63px", sm: "90px", lg: "130px" }} src={el.icon} alt={el.title} />
                                            <Image width={{ base: "63px", sm: "90px", lg: "130px" }} src={el.icon} alt={el.title} />
                                        </Box>
                                    </VStack>
                                </MainCard>
                            ))}
                        </Flex>
                    </VStack>
                </Flex>
            </Box>
        </Flex>
    )
}

export default ProductsMain