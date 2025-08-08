import { Box, Flex, Text } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import React from 'react'

interface Props {
    onClick: () => void
}

function AddRateButton({ onClick }: Props) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            padding={4}
            fontSize={14}
            color="text.link"
        >
            <Box>
                <Text fontWeight={500}>Add New Rate</Text>
                <Text color="text.subtext.placeholder.dark">Add options and rates for this zone.</Text>
            </Box>

            <button onClick={onClick}>
                <PlusMd color='currentColor' />
            </button>
        </Flex>
    )
}

export default AddRateButton