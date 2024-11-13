import { Box, Tooltip as ChakraTooltip, TextProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { PropsWithChildren } from "react"

interface ProductTitleProps extends TextProps {
    title: string
    wordLimit?: number
}

interface TooltipProps extends PropsWithChildren {
    label: string
}

export default function ProductTitleCell({ title, wordLimit = 15, ...rest }: ProductTitleProps) {
    const renderProductTitleElement = (title: string) =>
        <AppTypography fontSize={16} color="white" {...rest}>{title}</AppTypography>

    return (
        <>
            {title.length > wordLimit ?
                <Tooltip label={title}>
                    {renderProductTitleElement(title.slice(0, wordLimit) + '...')}
                </Tooltip>
                :
                renderProductTitleElement(title)
            }
        </>
    )
}

function Tooltip({ label, children }: TooltipProps) {
    return (
        <ChakraTooltip
            label={label}
            borderRadius={8}
            padding={3}
            bgColor={"#fff"}
            color={"#000"}
            hasArrow
        >
            <Box as="span">{children}</Box>
        </ChakraTooltip>
    )
}