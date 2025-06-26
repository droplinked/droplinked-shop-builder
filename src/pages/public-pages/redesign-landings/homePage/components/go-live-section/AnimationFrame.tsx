import { useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import MobileAnimationFrame from './MobileAnimationFrame'
import DesktopAnimationFrame from './DesktopAnimationFrame'

interface Props {
    LottieView: React.ReactNode
    completedSteps?: number[]
    isTransitioning?: boolean
}

export default function AnimationFrame({ LottieView, completedSteps = [], isTransitioning = false }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    if (isSmallerThan768) {
        return (
            <MobileAnimationFrame
                LottieView={LottieView}
                completedSteps={completedSteps}
                isTransitioning={isTransitioning}
            />
        )
    }

    return (
        <DesktopAnimationFrame
            LottieView={LottieView}
            completedSteps={completedSteps}
            isTransitioning={isTransitioning}
        />
    )
}
