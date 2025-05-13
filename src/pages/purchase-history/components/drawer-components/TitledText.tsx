import { Flex, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    text: string | ReactNode
    direction?: "row" | "column"
    rightContent?: ReactNode
}

/**
    * TitledText component displays a title and text in a flexible layout
    * This component can be used to present key-value pairs in a structured manner.
    * It supports customizable direction for layout alignment.
    * @param title - The title to display
    * @param text - The text to display alongside the title
    * @param direction - The layout direction, either 'row' or 'column'
    * @param rightContent - Optional additional content to display on the right side
    * @returns A Flex component containing the title and text
 */

export default function TitledText({ title, text, rightContent, direction = "column" }: Props) {
    return (
        <Flex flexDirection={direction} gap={1} justifyContent="space-between">
            <Text color="text.subtext.placeholder.dark" fontSize={14}>{title}</Text>
            <Flex alignItems="center" gap={1.5}>
                <Text color="#fff" fontSize={14} fontWeight={500}>{text ?? "---"}</Text>
                {rightContent && (
                    <Flex alignItems="center" justifyContent="flex-end" width="100%">
                        {rightContent}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
