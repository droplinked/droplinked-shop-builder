import { Box } from '@chakra-ui/react'
import React from 'react'
import { OnboardingStepData } from '../types/onboarding'
import CompletionSection from './completion/CompletionSection'
import EmailConfirmation from './email-confirmation/EmailConfirmation'
import FeatureSelection from './feature-selection/FeatureSelection'
import PaymentSetup from './payment-setup/PaymentSetup'
import ShopSetupForm from './shop-setup/ShopSetupForm'
import SignInForm from './sign-in/SignInForm'
import SignUpForm from './sign-up/SignUpForm'
import SubscriptionPlan from './subscription-plan/SubscriptionPlan'

interface Props {
    step: number
    data: OnboardingStepData
    onNext: () => void
    onBack: () => void
    shopData?: any
    updateShopData?: (data: any) => void
}

function OnboardingStepContent({ step, data, onNext, onBack, shopData, updateShopData }: Props) {
    function renderContent() {
        switch (data.type) {
            case 'sign-in':
                return <SignInForm onNext={onNext} />
            case 'sign-up':
                return <SignUpForm onBack={onBack} onNext={onNext} />
            case 'email-confirmation':
                return <EmailConfirmation onBack={onBack} onNext={onNext} />
            case 'feature-selection':
                return <FeatureSelection />
            case 'shop-setup':
                return <ShopSetupForm />
            case 'payment-setup':
                return <PaymentSetup />
            case 'subscription-plan':
                return <SubscriptionPlan />
            case 'completion':
                return <CompletionSection />
            default:
                return <Box>Step not implemented</Box>
        }
    }

    return (
        <Box>
            {renderContent()}
        </Box>
    )
}

export default OnboardingStepContent