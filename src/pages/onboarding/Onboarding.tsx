import React from 'react'
import CompletionSection from './components/completion/CompletionSection'
import OnboardingStepContent from './components/OnboardingStepContent'
import OnboardingStepWrapper from './components/OnboardingStepWrapper'
import useOnboardingStore from './store/useOnboardingStore'

function Onboarding() {
    const { currentStep } = useOnboardingStore()

    if (currentStep === 6) return <CompletionSection />

    return (
        <OnboardingStepWrapper currentStep={currentStep}>
            <OnboardingStepContent />
        </OnboardingStepWrapper>
    )
}

export default Onboarding