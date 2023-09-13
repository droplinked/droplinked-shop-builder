import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import MainCard from '../parts/card/MainCard'

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
        <Flex justifyContent="center" alignItems="center">
            <VStack width="80%" justifyContent="center" color="#FFF">
                <Box><AppTypography size="34px" weight='bolder'>Supported Networks</AppTypography></Box>
                <Box padding="10px 0 30px 0"><AppTypography size="20px" color="#888">A versatile platform that offers robust support for multi-chain functionality</AppTypography></Box>
                <Flex columnGap="140px" rowGap="50px" flexWrap="wrap" width="100%" justifyContent="center">
                    {data.map((el, key) => <Image key={key}  height="24px" src={el} />)}
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Supported