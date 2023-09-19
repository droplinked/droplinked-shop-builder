import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

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
            <VStack width="90%" justifyContent="center" spacing="20px" color="#FFF">
                <Box><AppTypography textAlign={{ base: "center", lg: "left" }} size={{ base: "18px", sm: "34px" }} weight='bolder'>Supported Networks</AppTypography></Box>
                <Box padding="10px 0 30px 0"><AppTypography textAlign={{ base: "center", lg: "left" }} size={{ base: "14px", sm: "20px" }} color="#888">A versatile platform that offers robust support for multi-chain functionality</AppTypography></Box>
                <Flex columnGap={{ base: "14px", sm: "80px", lg: "140px" }} rowGap="50px" flexWrap="wrap" width="100%" justifyContent="center">
                    {data.map((el, key) => <Image key={key} height={{ base: "14px", sm: "24px", lg: "34px" }} src={el} />)}
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Supported