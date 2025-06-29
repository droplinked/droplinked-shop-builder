import { Box, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

function TypographyText({ svg }: { svg: React.ReactNode }) {
    const isSmallerThanMd = useBreakpointValue({ base: true, md: false })
    const scale = useBreakpointValue({ base: 0.6, md: 0.7, xl: 0.8, "2xl": 1 })

    if (isSmallerThanMd) return <Box display="none" />;

    return (
        <Box
            mb="-16px"
            transform={`scale(${scale})`}
            transformOrigin="center"
        >
            {svg}
        </Box>
    )
}

export default TypographyText