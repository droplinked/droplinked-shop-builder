import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'

function Supported() {
    const data = [
        'assets/images/homepage/stacks.png',
        'assets/images/homepage/polygon.png',
        'assets/images/homepage/casper.png',
        'assets/images/homepage/Near.png',
        'assets/images/homepage/xrp-ledger.png',
        'assets/images/homepage/Unisat.png',
        'assets/images/homepage/Binance.png',
        'assets/images/homepage/Solana.png',
        'assets/images/homepage/base.png',
        'assets/images/homepage/skale.png',
        'assets/images/homepage/Hedera.png'
    ]

    return (
        <Flex justifyContent="center" height="100%" alignItems="center">
            <VStack width="90%" justifyContent="center" spacing="20px" color="#FFF">
                <Box><LandingTitle title='Supported Networks' /></Box>
                <Box padding="10px 0 30px 0"><LandingDescription text='Multi-chain support to provide the flexibility you need' /></Box>
                <Flex
                    width="100%"
                    justifyContent="center"
                    flexWrap="wrap"
                    columnGap={{ base: "20px", sm: "80px" }}
                    rowGap="48px"
                >
                    {data.map((el, key) => <Image key={key} height={{ base: "14px", sm: "24px", lg: "34px" }} src={el} />)}
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Supported