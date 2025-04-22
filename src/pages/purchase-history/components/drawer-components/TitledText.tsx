import { Flex, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    text: string | ReactNode
    direction?: "row" | "column"
}

/**
    * TitledText component displays a title and text in a flexible layout
    * This component can be used to present key-value pairs in a structured manner.
    * It supports customizable direction for layout alignment.
    * @param title - The title to display
    * @param text - The text to display alongside the title
    * @param direction - The layout direction, either 'row' or 'column'
    * @returns A Flex component containing the title and text
 */

export default function TitledText({ title, text, direction = "column" }: Props) {
    return (
        <Flex flexDirection={direction} gap={1} justifyContent="space-between">
            <Text color="text.subtextPlaceholder.dark" fontSize={14}>{title}</Text>
            <Text color="#fff" fontSize={14} fontWeight={500}>{text ?? "---"}</Text>
        </Flex>
    )
}
