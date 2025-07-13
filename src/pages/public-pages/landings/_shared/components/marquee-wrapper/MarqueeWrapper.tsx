import { Box } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import Marquee from 'react-fast-marquee'

/**
 * Wrapper component for creating a horizontal scrolling marquee with gradient fade effects on sides
 * @param children - React nodes to be displayed in the scrolling marquee
 */
export default function MarqueeWrapper({ children }: { children: React.ReactNode }) {
    const { isRTL } = useLocaleResources('common')

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
                    left: isRTL ? null : 0,
                    right: isRTL ? 0 : null,
                    background: isRTL
                        ? 'linear-gradient(to left, #0A0A0A, transparent)'
                        : 'linear-gradient(to right, #0A0A0A, transparent)',
                },
                '&::after': {
                    right: isRTL ? null : 0,
                    left: isRTL ? 0 : null,
                    background: isRTL
                        ? 'linear-gradient(to right, #0A0A0A, transparent)'
                        : 'linear-gradient(to left, #0A0A0A, transparent)',
                },
            }}
        >
            <Marquee
                direction={isRTL ? 'left' : 'right'}
                speed={25}
                gradient={false}
                gradientWidth={0}
                gradientColor="#0A0A0A"
                pauseOnHover={false}
                play={true}
                style={{ direction: "ltr" }}
            >
                {children}
            </Marquee>
        </Box>
    )
}