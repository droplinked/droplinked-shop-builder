import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'
import MainCard from '../parts/card/MainCard'
import classes from './style.module.scss'

function ProductsMain({ loaded }) {
    const data = [
        {
            title: 'Physical Items',
            url: '',
            icon: '/assets/images/homepage/physicalProducts.svg'
        },
        {
            title: 'Print On Demand',
            url: '',
            icon: '/assets/images/homepage/pod.svg'
        },
        {
            title: 'Digital Goods',
            url: '',
            icon: '/assets/images/homepage/digital.svg'
        },
        {
            title: 'Events',
            url: '',
            icon: '/assets/images/homepage/event.svg'
        }
    ]

    const checkLoad = useMemo(() => loaded.includes('products'), [loaded])

    return (
        <Box position="relative">
            <Flex justifyContent="center" alignItems="center">
                <VStack width="95%" maxWidth={checkLoad ? "1400px" : "100%"} opacity={checkLoad ? 1 : 0} transition={".7s"} justifyContent="center" color="#FFF">
                    <Box>
                        <AppTypography size={{ base: "18px", sm: "34px" }} weight='bolder' textAlign={{ base: "center", lg: "left" }}>Decentralized Registration of Products</AppTypography>
                    </Box>
                    <Box padding="10px 0 30px 0">
                        <AppTypography size={{ base: "14px", sm: "20px" }} textAlign={{ base: "center", lg: "left" }} color="#888">Sell types of products on chain in your customized online store integrated with web3 tools</AppTypography>
                    </Box>
                    <Flex width={{ base: "80%", md: "100%" }} flexWrap="wrap" justifyContent="space-between">
                        {data.map((el, key) => (
                            <MainCard key={key}>
                                <VStack justifyContent="center" spacing="20px">
                                    <AppTypography size={{ base: '14px', sm: '20px' }} color="#f5f5f5">{el.title}</AppTypography>
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