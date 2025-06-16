import { Box, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

export default function AnimationFrame({
    LottieView,
    completedSteps = [],
    isTransitioning = false
}: {
    LottieView: React.ReactNode
    completedSteps?: number[]
    isTransitioning?: boolean
}) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    const renderLayer = (zIndex: number, opacity: number = 1, isActive: boolean = false) => (
        <Box
            width="100%"
            height="100%"
            borderRadius="24px 24px 0px 0px"
            border="1px solid rgba(43, 207, 161, 0.16)"
            borderBottom="none"
            background="linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%)"
            backdropFilter="blur(50px)"
            padding="8px 8px 0px 8px"
            position={zIndex > 0 ? "absolute" : "relative"}
            top={zIndex > 0 ? `-${zIndex * 25}px` : "0"}
            left={zIndex > 0 ? `-${zIndex}px` : "0"}
            zIndex={10 - zIndex}
            opacity={isActive && isTransitioning ? 0 : opacity}
            transform={`scale(${1 - zIndex * 0.05}) ${isActive && isTransitioning ? 'scale(0.9)' : ''}`}
            filter={isActive && isTransitioning ? "blur(12px)" : "blur(0px)"}
            transition="all 0.4s ease-in-out"
            // Add animation for background layers
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

    return (
        <>
            {isSmallerThan768 && (
                <Box position="relative">
                    {/* Render completed step layers */}
                    {completedSteps.map((stepNum, index) => (
                        <React.Fragment key={stepNum}>
                            {renderLayer(index + 1, 0.6)}
                        </React.Fragment>
                    ))}
                    {/* Render active layer */}
                    {renderLayer(0, 1, true)}
                </Box>
            )}

            {!isSmallerThan768 && (
                <Box
                    position="relative"
                    backgroundImage="url('https://upload-file-droplinked.s3.amazonaws.com/23cf80fd633d9c14976dbd81b510663bca2e8584b4ac09ad667e6da2c34dbd52.png')"
                    backgroundSize="contain"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    padding={{ md: "24px 24px 0px 24px", lg: "48px 48px 0px 48px" }}
                >
                    <Box position="relative">
                        {/* Render completed step layers */}
                        {completedSteps.map((stepNum, index) => (
                            <React.Fragment key={stepNum}>
                                {renderLayer(index + 1, 0.6)}
                            </React.Fragment>
                        ))}
                        {/* Render active layer */}
                        {renderLayer(0, 1, true)}
                    </Box>
                </Box>
            )}
        </>
    )
}
