import { Flex, Text } from '@chakra-ui/react'
import { TooltipSm } from 'assets/icons/Sign/Tooltip/TooltipSm'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    text: string | ReactNode
    direction?: "row" | "column"
    rightContent?: ReactNode
    toolTipText?: string
}

/**
    * TitledText component displays a title and text in a flexible layout
    * This component can be used to present key-value pairs in a structured manner.
    * It supports customizable direction for layout alignment.
    * @param title - The title to display
    * @param text - The text to display alongside the title
    * @param direction - The layout direction, either 'row' or 'column'
    * @param rightContent - Optional additional content to display on the right side
    * @param toolTipText - Optional tooltip text for the title
    * @returns A Flex component containing the title and text
 */

export default function TitledText({ title, text, rightContent, toolTipText, direction = "row" }: Props) {
    return (
        <Flex flexDirection={direction} gap={1} justifyContent="space-between">            <Flex gap={1} alignItems="center">
            <Text color="text.subtext.placeholder.dark" fontSize={14}>{title}</Text>
            {toolTipText && (
                <AppTooltip label={toolTipText}>
                    <span>
                        <TooltipSm color="#333333" width="16px" height="16px" />
                    </span>
                </AppTooltip>
            )}
        </Flex>
            <Flex alignItems="center" gap={1.5}>
                <Text color="#fff" fontSize={14} fontWeight={500} width="max-content">{text ?? "---"}</Text>
                {rightContent && (
                    <Flex alignItems="center" justifyContent="flex-end" width="100%">
                        {rightContent}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
