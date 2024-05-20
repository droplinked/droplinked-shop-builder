import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import MainCard from '../parts/card/MainCard'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import classes from './style.module.scss'

function ProductsMain() {
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

    return (
        <Flex maxWidth={"100%"} direction={"column"} gap={4}>
            <Flex direction={"column"} gap={2}>
                <LandingTitle title='Decentralized Registration of Products' />
                <LandingDescription text='Start selling today with a customizable storefront paired with web3 tools for on-chain transparency' />
            </Flex>
            <Flex flexWrap={{ base: "wrap", md: "nowrap" }} transition=".7s" justifyContent="center" gap={{ base: "4%", md: "20px", xl: "56px" }}>
                {data.map((el, key) => (
                    <MainCard key={key}>
                        <VStack justifyContent="center" spacing={{ base: "10px", lg: "40px" }}>
                            <AppTypography textAlign="center" height={{ base: "42px", sm: "30px", md: "40px", lg: "auto" }} fontSize={{ base: '14px', sm: '16px', xl: '20px' }} color="#f5f5f5">{el.title}</AppTypography>
                            <Box width="100%" height={{ base: "60px", sm: "130px" }} className={classes.images} position="relative">
                                <Image width={{ base: "63px", sm: "90px", lg: "130px" }} src={el.icon} alt={el.title} />
                                <Image width={{ base: "63px", sm: "90px", lg: "130px" }} src={el.icon} alt={el.title} />
                            </Box>
                        </VStack>
                    </MainCard>
                ))}
            </Flex>
        </Flex>
    )
}

export default ProductsMain