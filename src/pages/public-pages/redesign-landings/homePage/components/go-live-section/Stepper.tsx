import { Flex, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useStepController } from '../../hooks/useStepController'
import ProgressBar from './ProgressBar'
import AnimationFrame from './AnimationFrame'
import StepTexts from './StepTexts'

export default function Stepper() {
    const { containerRef, step, completedSteps, fixedPercentage, LottieView, isTransitioning } = useStepController()

    // Force a ScrollTrigger refresh when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Import ScrollTrigger dynamically
            const importScrollTrigger = async () => {
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                ScrollTrigger.refresh();
            };

            importScrollTrigger();
        }
    }, []);

    return (
        <Box
            className="stepper-container"
            position="relative"
            w="100%"
            minH="100vh"
            overflow="hidden"
        >
            <Flex
                ref={containerRef}
                minH="100vh"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                px={{ base: 4, md: 8, lg: 12 }}
                className="stepper-content"
            >
                <AnimationFrame
                    LottieView={LottieView}
                    completedSteps={completedSteps}
                    isTransitioning={isTransitioning}
                />
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
        </Box>
    )
}
