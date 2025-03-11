import { Box, Show, Hide } from '@chakra-ui/react'
import React from 'react'
import useOnboardingStore from '../../../stores/useOnboardingStore'
import MobileStepper from './MobileStepper'
import DesktopStepper from './DesktopStepper'

function Stepper() {
    const { currentStep } = useOnboardingStore()

    if (currentStep < 4 || currentStep > 6) return null

    return (
        <>
            <Hide below="md">
                <DesktopStepper />
            </Hide>
            <Show below="md">
                <Box px={4} width="50%" my="auto">
                    <MobileStepper />
                </Box>
            </Show>
        </>
    )
}

export default Stepper