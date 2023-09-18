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
        <Flex justifyContent="center" alignItems="center">
            <VStack width="95%" justifyContent="center" color="#FFF">
                <Box><AppTypography size="34px" weight='bolder'>Decentralized Registration of Products</AppTypography></Box>
                <Box padding="10px 0 30px 0"><AppTypography size="20px" color="#888">Sell types of products on chain in your customized online store integrated with web3 tools</AppTypography></Box>
                <Flex width="95%" maxWidth={checkLoad ? "1400px" : "100%"} opacity={checkLoad ? 1 : 0} transition={".7s"} justifyContent="space-between" color="#FFF">
                    {data.map((el, key) => (
                        <MainCard width="22%" key={key}>
                            <VStack justifyContent="center" spacing="20px">
                                <AppTypography size='20px' weight='bolder' color="#f5f5f5">{el.title}</AppTypography>
                                <Box width="100%" height="130px" className={classes.images} position="relative">
                                    <Image width="130px" height="130px" src={el.icon} alt={el.title} />
                                    <Image width="130px" height="130px" src={el.icon} alt={el.title} />
                                </Box>
                            </VStack>
                        </MainCard>
                    ))}
                </Flex>
            </VStack>
        </Flex>
    )
}

export default ProductsMain