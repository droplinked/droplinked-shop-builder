import { Box } from '@chakra-ui/react'
import React from 'react'
import useOnboardingStore from '../stores/useOnboardingStore'
import CompletionSection from './completion/CompletionSection'
import EmailConfirmation from './email-confirmation/EmailConfirmation'
import PaymentSetup from './payment-setup/PaymentSetup'
import ShopSetupForm from './shop-setup/ShopSetupForm'
import SignInForm from './sign-in/SignInForm'
import SignUpForm from './sign-up/SignUpForm'
import SubscriptionPlan from './subscription-plan/SubscriptionPlan'

function OnboardingStepContent() {
    const { stepData, currentStep, nextStep, prevStep } = useOnboardingStore()

    const renderStepContent = () => {
        switch (stepData[currentStep].type) {
            case 'sign-in':
                return <SignInForm onNext={nextStep} />
            case 'sign-up':
                return <SignUpForm onBack={prevStep} onNext={nextStep} />
            case 'email-confirmation':
                return <EmailConfirmation onBack={prevStep} onNext={nextStep} />
            case 'shop-setup':
                return <ShopSetupForm onBack={prevStep} onNext={nextStep} />
            case 'payment-setup':
                return <PaymentSetup onBack={prevStep} onNext={nextStep} />
            case 'subscription-plan':
                return <SubscriptionPlan onBack={prevStep} onNext={nextStep} />
            case 'completion':
                return <CompletionSection />
            default:
                return <Box>Step not implemented</Box>
        }
    }

    return <>{renderStepContent()}</>
}

export default OnboardingStepContent