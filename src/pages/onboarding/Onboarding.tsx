import React from 'react'
import CompletionSection from './components/completion/CompletionSection'
import OnboardingStepContent from './components/OnboardingStepContent'
import OnboardingStepWrapper from './components/OnboardingStepWrapper'
import useOnboardingStore from './stores/useOnboardingStore'

function Onboarding() {
    const { currentStep } = useOnboardingStore()

    if (currentStep === 7) return <CompletionSection />

    return (
        <OnboardingStepWrapper currentStep={currentStep}>
            <OnboardingStepContent />
        </OnboardingStepWrapper>
    )
}

export default Onboarding