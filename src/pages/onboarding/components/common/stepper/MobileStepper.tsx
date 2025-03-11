import { Box } from '@chakra-ui/react'
import React from 'react'
import useOnboardingStore from '../../../stores/useOnboardingStore'

const MobileStepper = () => {
    const { currentStep } = useOnboardingStore()
    const totalSteps = 3
    const progress = ((currentStep - 4) / totalSteps) * 100
    const isFirstStep = currentStep === 4

    return (
        <Box position="relative" w="100%" h="4px">
            <Box
                position="absolute"
                w="100%"
                h="100%"
                bg="#292929"
                borderRadius="full"
            />
            <Box
                position="absolute"
                h="100%"
                bg="#2BCFA1"
                w={`${Math.max(0, Math.min(100, progress))}%`}
                borderRadius="full"
                transition="width 0.5s ease-in-out"
            />
            {!isFirstStep &&
                <Box
                    position="absolute"
                    w="2px"
                    h="2px"
                    bg="#292929"
                    borderRadius="full"
                    top="50%"
                    transform="translateY(-50%)"
                    left={`${Math.max(0, Math.min(100, progress))}%`}
                    ml="-3px"
                    transition="left 0.5s ease-in-out"
                />
            }
        </Box>
    )
}

export default MobileStepper
