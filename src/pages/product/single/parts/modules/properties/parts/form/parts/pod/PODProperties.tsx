import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function PODProperties() {
    return (
        <VStack color={"#FFF"} background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} width={"100%"}>
            <Flex>
                <Box width={"20%"}><AppTypography size="14px" color="#FFF">Colors</AppTypography></Box>
                <Box width={"80%"}></Box>
            </Flex>
            <Flex>
                <Box width={"20%"}><AppTypography size="14px" color="#FFF">Sizes</AppTypography></Box>
                <Box width={"80%"}></Box>
            </Flex>
        </VStack>
    )
}

export default PODProperties