import { Box } from '@chakra-ui/react'
import React from 'react'
import LayerBox from './LayerBox'

interface DesktopAnimationFrameProps {
    LottieView: React.ReactNode
    completedSteps: number[]
    isTransitioning: boolean
}

export default function DesktopAnimationFrame({ LottieView, completedSteps, isTransitioning }: DesktopAnimationFrameProps) {
    return (
        <Box
            position="relative"
            backgroundImage="url('https://upload-file-droplinked.s3.amazonaws.com/23cf80fd633d9c14976dbd81b510663bca2e8584b4ac09ad667e6da2c34dbd52.png')"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            padding={{ md: "16px 16px 0px 16px", lg: "24px 24px 0px 24px", xl: "48px 48px 0px 48px" }}
        >
            <Box position="relative">
                {/* Render completed step layers */}
                {completedSteps.map((stepNum, index) => (
                    <LayerBox
                        key={stepNum}
                        zIndex={index + 1}
                        opacity={0.6}
                        isTransitioning={isTransitioning}
                    />
                ))}
                {/* Render active layer */}
                <LayerBox
                    LottieView={LottieView}
                    zIndex={0}
                    opacity={1}
                    isActive={true}
                    isTransitioning={isTransitioning}
                />
            </Box>
        </Box>
    )
}
