import { Box, BoxProps, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

interface TypographyTextProps extends BoxProps {
    svg: React.ReactNode;
}

function TypographyText({ svg, ...boxProps }: TypographyTextProps) {
    const isSmallerThanMd = useBreakpointValue({ base: true, md: false })
    const scale = useBreakpointValue({ base: 0.6, md: 0.7, xl: 0.8, "2xl": 1 })

    if (isSmallerThanMd) return <Box display="none" />;

    return (
        <Box
            mb="-16px"
            transform={`scale(${scale})`}
            transformOrigin="center"
            display="flex"
            justifyContent="center"
            {...boxProps}
        >
            {svg}
        </Box>
    )
}

export default TypographyText