import { Image, VStack } from '@chakra-ui/react'
import React from 'react'
import Stepper from './Stepper'

interface OnboardingHeaderProps {
    showStepper?: boolean
}

function OnboardingHeader({ showStepper = false }: OnboardingHeaderProps) {
    return (
        <VStack spacing={6} mb={8}>
            <Image
                src="/logo.png" // Replace with your logo path
                alt="Website Logo"
                maxH="60px"
                objectFit="contain"
            />
            {showStepper && <Stepper currentStep={0} totalSteps={4} />}
        </VStack>
    )
}

export default OnboardingHeader