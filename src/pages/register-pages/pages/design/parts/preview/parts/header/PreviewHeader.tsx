import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import previewHeaderModel from './model'

function PreviewHeader() {
    const { icons } = previewHeaderModel
    return (
        <Flex justifyContent="space-between" width="90%" alignItems="center">
            <Box>{icons({ icon: "logo", color: "#FFF" })}</Box>
            <HStack>
                <Box>{icons({ icon: "user", color: "#FFF" })}</Box>
                <Box>{icons({ icon: "cart", color: "#FFF" })}</Box>
                <Box>{icons({ icon: "notification", color: "#FFF" })}</Box>
            </HStack>
        </Flex>
    )
}

export default PreviewHeader