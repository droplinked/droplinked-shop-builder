import { Box, Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import designPageAiModel from './model'

function DesignPageAi() {
    const { icons: { ai, cloud } } = designPageAiModel
    return (
        <Flex position="relative" padding="0 32px" backgroundColor="#000" borderRadius="8px" height="80px" alignItems="center" justifyContent="center">
            <Box position="absolute" top="0" left="0">{ai}</Box>
            <Flex width="100%" justifyContent="space-between" position="relative" alignItems="center">
                <AppTypography size="16px" color="#FFF" weight='bolder'>AI Shop Generator</AppTypography>
                {cloud}
            </Flex>
        </Flex>
    )
}

export default DesignPageAi