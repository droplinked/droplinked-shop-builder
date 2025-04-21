import { Flex, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    text: string | ReactNode
    direction?: "row" | "column"
}

export default function TitledText({ title, text, direction = "column" }: Props) {
    return (
        <Flex flexDirection={direction} gap={1} justifyContent="space-between">
            <Text color="text.subtextPlaceholder.dark" fontSize={14}>{title}</Text>
            <Text color="#fff" fontSize={14} fontWeight={500}>{text ?? "---"}</Text>
        </Flex>
    )
}
