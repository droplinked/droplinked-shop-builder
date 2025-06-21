import { Box, Hide, Show } from '@chakra-ui/react'
import React from 'react'
import useOnboardingStore from '../../../stores/useOnboardingStore'
import DesktopStepper from './DesktopStepper'
import MobileStepper from './MobileStepper'

function Stepper() {
    const { currentStep } = useOnboardingStore()

    const visibleSteps = ['EXISTING_WEBSITE', 'STORE_DETAILS', 'PAYMENT_DETAILS', 'PLAN_SELECTION']

    if (!visibleSteps.includes(currentStep)) return null

    return (
        <>
            <Hide below="md">
                <Box width={{ base: '50%', lg: '100%' }}>
                    <DesktopStepper />
                </Box>
            </Hide>
            <Show below="md">
                <Box px={4} width="50%" my="auto">
                    <MobileStepper visibleSteps={visibleSteps} />
                </Box>
            </Show>
        </>
    )
}

export default Stepper