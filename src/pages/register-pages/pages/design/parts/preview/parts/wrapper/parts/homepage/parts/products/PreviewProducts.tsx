import { Box, SimpleGrid } from '@chakra-ui/layout'
import React from 'react'

function PreviewProducts() {
    return (
        <SimpleGrid columns={3} spacing="15px">
            <Box height="200px" backgroundColor="#555"></Box>
            <Box height="200px" backgroundColor="#555"></Box>
            <Box height="200px" backgroundColor="#555"></Box>
            <Box height="200px" backgroundColor="#555"></Box>
            <Box height="200px" backgroundColor="#555"></Box>
        </SimpleGrid>
    )
}

export default PreviewProducts