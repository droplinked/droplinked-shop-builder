import { Box } from '@chakra-ui/react'
import React from 'react'
import Marquee from 'react-fast-marquee'

export default function MarqueeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Box
            width="100%"
            position="relative"
            sx={{
                '.rfm-child': {
                    marginX: '8px',
                },
                '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '100px',
                    zIndex: 2,
                },
                '&::before': {
                    left: 0,
                    background: 'linear-gradient(to right, #0A0A0A, transparent)',
                },
                '&::after': {
                    right: 0,
                    background: 'linear-gradient(to left, #0A0A0A, transparent)',
                },
            }}
        >
            <Marquee
                direction='left'
                speed={25}
            >
                {children}
            </Marquee>
        </Box>
    )
}
