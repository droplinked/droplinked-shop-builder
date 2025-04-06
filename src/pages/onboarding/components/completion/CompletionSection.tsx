import { Flex } from '@chakra-ui/react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import DroplinkedBrand from '../common/DroplinkedBrand'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import CompletionSlider from './CompletionSlider'

function CompletionSection({ onBack }: Pick<OnboardingStepProps, "onBack">) {
    return (
        <Flex
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

            <CompletionSlider onBack={onBack} />
        </Flex>
    )
}

export default CompletionSection