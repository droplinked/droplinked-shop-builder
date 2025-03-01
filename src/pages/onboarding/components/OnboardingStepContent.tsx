import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useOnboarding } from '../hooks/useOnboarding'

function OnboardingStepContent() {
    const { currentStep, stepData, nextStep, prevStep } = useOnboarding()

    function renderContent() {
        return <Text color="#FFF">Step {currentStep + 1}</Text>
    }

    return (
        <Box>
            {renderContent()}
        </Box>
    )
}

export default OnboardingStepContent