import { TextProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Props extends TextProps { }

function D3Paragraph({ children, ...props }: Props) {
    return (
        <AppTypography fontSize={{ base: 14, md: 16 }} fontWeight={400} color="#7B7B7B" {...props}>{children}</AppTypography>
    )
}

export default D3Paragraph