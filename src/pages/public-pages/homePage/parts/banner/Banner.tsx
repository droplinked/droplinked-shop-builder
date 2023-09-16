import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Droplinked from './parts/droplinked/Droplinked'
import Typewriter from 'typewriter-effect';

function Banner() {
    return (
        <Box position="relative">
            <Image src="assets/images/homepage/droplinked1.svg" position="absolute" zIndex="1" top="-200px" width="100%" />
            <Image src="assets/images/homepage/shape.svg" position="absolute" zIndex="1" right="26%" bottom="0" width="34px" />
            <Flex height="100%" justifyContent="center" alignItems="center" position="relative" zIndex="2">
                <VStack justifyContent="center" color="#FFF">
                    <Box><Droplinked /></Box>
                    <Box textAlign="center"><AppTypography size="50px" weight='bolder'>Powering the Next Generation of Commerce</AppTypography></Box>
                    <Box padding="10px 0 30px 0">
                        <Text fontSize="34px" display="flex">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Build a Customizable Store',
                                        'Sell Diverse Products',
                                        'Token Gating Collections',
                                        'Mint to Merch',
                                        'Decentralize Inventory',
                                        'Sales Tracking',
                                        'Transparent Co-selling',
                                        'Increase Earnings'
                                    ],
                                    cursor: '',
                                    autoStart: true,
                                    loop: true
                                }}
                            /> | On-Chain
                        </Text>
                    </Box>
                    <Box><BasicButton>Start Selling</BasicButton></Box>
                </VStack>
            </Flex>
        </Box>
    )
}

export default Banner