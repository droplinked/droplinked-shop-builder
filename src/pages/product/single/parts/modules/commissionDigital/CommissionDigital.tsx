import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function CommissionDigital() {
    return (
        <Flex gap={3}>
            <Box><AppSwitch onChange={(e) => console.log('purchaseAvailable', e.target.checked)} /></Box>
            <VStack align='stretch' color="#C2C2C2" spacing={1}>
                <AppTypography size='14px' weight='bolder'>I want to available this NFT to affiliate purchases with %10 commission for collaborators</AppTypography>
                <AppTypography size='14px'>Description</AppTypography>
            </VStack>
        </Flex>
    )
}

export default CommissionDigital