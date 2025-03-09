import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

function RightSectionWrapper({ children, ...props }: BoxProps) {
    return (
        <Box
            padding='80px'
            bg='linear-gradient(180deg, #1C1C1C 0%, #141414 100%)'
            {...props}
        >
            {children}
        </Box>
    )
}

export default RightSectionWrapper