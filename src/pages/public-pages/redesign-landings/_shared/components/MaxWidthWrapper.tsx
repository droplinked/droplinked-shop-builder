import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

export default function MaxWidthWrapper({ children, ...rest }: BoxProps) {
    return (
        <Box
            width="100%"
            maxWidth="1440px"
            margin="0 auto"
            paddingInline={{ base: 4, md: 9, xl: "60px", "2xl": "72px" }}
            {...rest}
        >
            {children}
        </Box>
    )
}