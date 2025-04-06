import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    children: React.ReactNode
    title: string
}

export default function FieldWrapper({ children, title }: Props) {
    return (
        <Flex flexDirection="column" gap={4}>
            <Text fontSize={16} color="#fff" fontWeight={500}>{title}</Text>
            {children}
        </Flex>
    )
}
