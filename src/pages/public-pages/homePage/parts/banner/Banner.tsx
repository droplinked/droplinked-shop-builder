import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Droplinked from './parts/droplinked/Droplinked'

function Banner() {
    return (
        <Flex height="100%" justifyContent="center" alignItems="center">
            <VStack justifyContent="center" color="#FFF">
                <Box><Droplinked /></Box>
                <Box><AppTypography size="50px" weight='bolder'>Powering The Next Generation of Commerce</AppTypography></Box>
                <Box padding="10px 0 30px 0"><Text fontSize="34px">Build Customized Online Store| On-Chain</Text></Box>
                <Box><BasicButton>Start Selling</BasicButton></Box>
            </VStack>
        </Flex>
    )
}

export default Banner