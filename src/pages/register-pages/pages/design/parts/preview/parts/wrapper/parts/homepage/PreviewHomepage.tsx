import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'
import PreviewProducts from './parts/products/PreviewProducts'
import PreviewProfile from './parts/profile/PreviewProfile'

function PreviewHomepage() {

    return (
        <Flex justifyContent="center">
            <Flex width="85%" gap="20px">
                <Box width="30%"><PreviewProfile /></Box>
                <Box width="70%"><PreviewProducts /></Box>
            </Flex>
        </Flex>
    )
}

export default PreviewHomepage