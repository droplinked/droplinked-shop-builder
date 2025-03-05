import { TextProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Props extends TextProps { }

function LandingText({ children, ...props }: Props) {
    return (
        <AppTypography fontSize={{ base: 14, md: 16 }} fontWeight={400} color="text.subtextPlaceholder.dark" {...props}>{children}</AppTypography>
    )
}

export default LandingText