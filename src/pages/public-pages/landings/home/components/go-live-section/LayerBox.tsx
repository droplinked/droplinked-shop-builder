import { Box, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

interface LayerBoxProps {
    LottieView?: React.ReactNode
    zIndex: number
    opacity?: number
    isActive?: boolean
    isTransitioning?: boolean
    width?: string | object
}

export default function LayerBox({ LottieView, zIndex, opacity = 1, isActive = false, isTransitioning = false, width }: LayerBoxProps) {
    const topCalculateNumber = useBreakpointValue({ base: 10, md: 13, lg: 15, xl: 25 })
    const defaultWidth = { base: "100%", md: "100%", lg: "100dvh" }

    return (
        <Box
            width={width || defaultWidth}
            height="100%"
            borderRadius="24px 24px 0px 0px"
            border="1px solid rgba(43, 207, 161, 0.16)"
            borderBottom="none"
            background="linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%)"
            backdropFilter="blur(50px)"
            padding="8px 8px 0px 8px"
            position={zIndex > 0 ? "absolute" : "relative"}
            top={zIndex > 0 ? `-${zIndex * topCalculateNumber}px` : "0"}
            left={zIndex > 0 ? `-${zIndex}px` : "0"}
            zIndex={10 - zIndex}
            opacity={isActive && isTransitioning ? 0 : opacity}
            transform={`scale(${1 - zIndex * 0.05}) ${isActive && isTransitioning ? 'scale(0.9)' : ''}`}
            filter={isActive && isTransitioning ? "blur(12px)" : "blur(0px)"}
            transition="all 0.4s ease-in-out"
            animation="layerFadeIn 0.3s ease-out"
            sx={{
                "svg": {
                    borderRadius: "16px 16px 0 0"
                },
                "@keyframes layerFadeIn": {
                    "0%": {
                        opacity: 0,
                    },
                    "100%": {
                        opacity: opacity,
                    }
                }
            }}
        >
            {isActive && LottieView}
        </Box>
    )
}
