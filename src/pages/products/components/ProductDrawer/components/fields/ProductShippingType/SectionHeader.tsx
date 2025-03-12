import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    title: string
    description: string
}

function SectionHeader({ title, description }: Props) {
    return (
        <Flex
            flexDirection="column"
            gap={1}
            fontSize={14}
        >
            <Text fontWeight={500} color="#FFF">
                {title}
            </Text>
            <Text color="text.subtextPlaceholder.dark">
                {description}
            </Text>
        </Flex>
    )
}

export default SectionHeader