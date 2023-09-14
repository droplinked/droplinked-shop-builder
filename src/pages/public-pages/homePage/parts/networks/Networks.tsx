import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function Networks() {
    return (
        <Flex justifyContent="center" alignItems="center" padding="50px 0">
            <VStack width="100%" justifyContent="center" color="#FFF">
                <Box><AppTypography size="34px" weight='bolder'>Supported Networks</AppTypography></Box>
                <Box padding="10px 0 30px 0"><AppTypography size="20px" color="#888">A versatile platform that offers robust support for multi-chain functionality</AppTypography></Box>
                <Flex width="95%" justifyContent="center" position="relative">
                    <Image src='assets/images/homepage/networks.svg' width="100%" />
                </Flex>
            </VStack>
        </Flex>
    )
}

export default Networks