import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    bgColor: string
    title: string
}

function StylizedTitle({ bgColor, title }: Props) {
    return (
        <Flex alignItems="center" gap={2}>
            <Box w={1} h={4} borderRadius={4} bgColor={bgColor} />
            <Text fontSize={14} color="#FFF">{title}</Text>
        </Flex>
    )
}

export default StylizedTitle