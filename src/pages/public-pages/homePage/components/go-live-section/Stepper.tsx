import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useStepController } from '../../hooks/useStepController'
import ProgressBar from './ProgressBar'
import AnimationFrame from './AnimationFrame'
import StepTexts from './StepTexts'

export default function Stepper() {
    const { containerRef, step, fixedPercentage, LottieView } = useStepController()

    return (
        <Flex
            ref={containerRef}
            minH="100vh"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px={{ base: 4, md: 8, lg: 12 }}
        >
            <AnimationFrame LottieView={LottieView} />
            <ProgressBar percentage={fixedPercentage} />
            <StepTexts currentStep={step} />
        </Flex>
    )
}
