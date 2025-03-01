import React from 'react'
import OnboardingHeader from './components/OnboardingHeader'
import OnboardingPageContainer from './components/OnboardingPageContainer'
import OnboardingStepContent from './components/OnboardingStepContent'
import { useOnboarding } from './hooks/useOnboarding'

function Onboarding() {
    const { currentStep } = useOnboarding()

    return (
        <OnboardingPageContainer hasRightSection={currentStep !== 7}>
            <OnboardingHeader showStepper={currentStep >= 3 && currentStep <= 6} />
            <OnboardingStepContent />
        </OnboardingPageContainer>
    )
}

export default Onboarding