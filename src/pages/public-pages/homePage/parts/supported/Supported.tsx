import { Flex, Image } from '@chakra-ui/react'
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
        'assets/images/homepage/Hedera.png',
        'assets/images/homepage/circle.png',
    ]

    return (
        <Flex justifyContent="center" height="100%" alignItems="center">
            <Flex width="90%" direction={"column"} justifyContent="center" gap={14} color="#FFF">
                <Flex direction={"column"} gap={6}>
                    <LandingTitle title='Networks' />
                    <LandingDescription text='Multi-chain support to provide the flexibility you need' />
                </Flex>
                <Flex
                    width="100%"
                    justifyContent="center"
                    flexWrap="wrap"
                    columnGap={{ base: "20px", sm: "80px" }}
                    rowGap="48px"
                >
                    {data.map((el, key) => <Image key={key} height={{ base: "14px", sm: "24px", lg: "34px" }} src={el} />)}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Supported