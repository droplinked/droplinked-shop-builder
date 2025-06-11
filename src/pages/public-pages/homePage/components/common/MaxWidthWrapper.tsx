import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface Props {
    boxProps?: BoxProps;
    children: React.ReactNode;
}

export default function MaxWidthWrapper({ boxProps, children }: Props) {
    return (
        <Box
            width="100%"
            paddingInline={{ base: 4, md: 9, xl: "60px", "2xl": "72px" }}
            paddingBlock={{ base: "80px", "2xl": "128px" }}
            {...boxProps}
        >
            {children}
        </Box>
    )
}
