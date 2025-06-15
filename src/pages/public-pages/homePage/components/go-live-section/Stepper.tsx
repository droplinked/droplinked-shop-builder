import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useStepController } from '../../hooks/useStepController'
import ProgressBar from './ProgressBar'
import AnimationFrame from './AnimationFrame'

export default function Stepper() {
    const { containerRef, fixedPercentage, LottieView } = useStepController()

    return (
        <Flex
            ref={containerRef}
            minH="100vh"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <AnimationFrame LottieView={LottieView} />
            <ProgressBar percentage={fixedPercentage} />
        </Flex>
    )
}
