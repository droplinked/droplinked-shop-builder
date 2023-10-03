import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'

function Supported() {
    const data = [
        'assets/images/homepage/Frame20780.png',
        'assets/images/homepage/Frame20781.png',
        'assets/images/homepage/Frame20782.png',
        'assets/images/homepage/casper.png',
        'assets/images/homepage/Near.png',
        'assets/images/homepage/XRPLedger.png',
        'assets/images/homepage/Unisat.png',
        'assets/images/homepage/Binance.png',
    ]

    return (
        <Flex justifyContent="center" height="100%" alignItems="center">
            <VStack width="90%" justifyContent="center" spacing="20px" color="#FFF">
                <Box><LandingTitle title='Supported Networks' /></Box>
                <Box padding="10px 0 30px 0"><LandingDescription text='Multi-chain support to provide the flexibility you need' /></Box>
                <Flex columnGap={{ base: "14px", sm: "80px", lg: "140px" }} rowGap="50px" flexWrap="wrap" width="100%" justifyContent="center">
                    {data.map((el, key) => <Image key={key} height={{ base: "14px", sm: "24px", lg: "34px" }} src={el} />)}
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Supported