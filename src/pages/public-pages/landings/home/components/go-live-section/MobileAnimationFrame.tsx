import { Box } from '@chakra-ui/react'
import React from 'react'
import LayerBox from './LayerBox'

interface MobileAnimationFrameProps {
    LottieView: React.ReactNode
    completedSteps: number[]
    isTransitioning: boolean
}

export default function MobileAnimationFrame({ LottieView, completedSteps, isTransitioning }: MobileAnimationFrameProps) {
    return (
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
    )
}
