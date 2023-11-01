import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'
import PreviewProducts from './parts/products/PreviewProducts'
import PreviewProfile from './parts/profile/PreviewProfile'

function PreviewHomepage() {
    return (
        <Flex justifyContent="center">
            <Flex width="80%" gap="20px">
                <Box width="25%"><PreviewProfile /></Box>
                <Box width="75%"><PreviewProducts /></Box>
            </Flex>
        </Flex>
    )
}

export default PreviewHomepage