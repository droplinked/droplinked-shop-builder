import { Flex } from '@chakra-ui/react'
import React from 'react'
import DroplinkedBrand from '../common/DroplinkedBrand'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import CompletionSlider from './CompletionSlider'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'

function CompletionSection() {
    const { updateOnboardingState } = useOnboardingStore()

    const handleBack = () => updateOnboardingState('currentStep', 'PLAN_SELECTION')

    return (
        <Flex
            minHeight="100vh"
            direction="column"
            alignItems="center"
            gap={{ base: 9, xl: 12 }}
            padding={{ base: 4, md: 6, lg: 9, xl: 12, '3xl': 16 }}
        >
            <DroplinkedBrand />

            <OnboardingStepHeader
                heading="You’re All Set!"
                description="Your account is now live and ready to use."
                textAlign="center"
            />

            <CompletionSlider onBack={handleBack} />
        </Flex>
    )
}

export default CompletionSection