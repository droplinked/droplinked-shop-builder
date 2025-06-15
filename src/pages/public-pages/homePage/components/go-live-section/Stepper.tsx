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
            <Flex
                width="100%"
                direction={{ base: "row", md: "column" }}
                alignItems={{ base: "flex-start", md: "center" }}
                gap={{ base: 6, md: 0 }}
                mt={4}
            >
                <ProgressBar percentage={fixedPercentage} />
                <StepTexts currentStep={step} />
            </Flex>
        </Flex>
    )
}
