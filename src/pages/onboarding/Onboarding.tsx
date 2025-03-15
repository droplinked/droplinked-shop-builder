import React, { useEffect } from 'react'
import CompletionSection from './components/completion/CompletionSection'
import EmailConfirmation from './components/email-confirmation/EmailConfirmation'
import PaymentFeatures from './components/payment-features/PaymentFeatures'
import PaymentSetup from './components/payment-setup/PaymentSetup'
import ProductCards from './components/product-cards/ProductCards'
import ShopPreview from './components/shop-preview/ShopPreview'
import ShopSetupForm from './components/shop-setup/ShopSetupForm'
import SignInForm from './components/sign-in/SignInForm'
import SignUpForm from './components/sign-up/SignUpForm'
import SubscriptionPlansDisplay from './components/subscription-plans-display/SubscriptionPlansDisplay'
import SubscriptionPlans from './components/subscription-plans/SubscriptionPlans'
import useOnboardingStore from './stores/useOnboardingStore'
import OnboardingLayout from './components/layout/OnboardingLayout'

export default function Onboarding() {
    const { currentStep, updateOnboardingState, nextStep, prevStep } = useOnboardingStore()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const entry = params.get('entry')?.toLowerCase()

        if (entry === 'signin') updateOnboardingState('currentStep', 'SIGN_IN')
        else if (entry === 'signup') updateOnboardingState('currentStep', 'SIGN_UP')
    }, [updateOnboardingState])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentStep])

    const stepContent = {
        'SIGN_IN': {
            leftContent: <SignInForm onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'SIGN_UP': {
            leftContent: <SignUpForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'EMAIL_CONFIRMATION': {
            leftContent: <EmailConfirmation onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'STORE_DETAILS': {
            leftContent: <ShopSetupForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ShopPreview />
        },
        'PAYMENT_DETAILS': {
            leftContent: <PaymentSetup onBack={prevStep} onNext={nextStep} />,
            rightContent: <PaymentFeatures />
        },
        'PLAN_SELECTION': {
            leftContent: <SubscriptionPlans onBack={prevStep} onNext={nextStep} />,
            rightContent: <SubscriptionPlansDisplay />
        },
        'YOU_ARE_ALL_SET': {
            leftContent: <CompletionSection onBack={prevStep} />,
            rightContent: null
        }
    }

    const { leftContent, rightContent } = stepContent[currentStep]
    const isMobileAuthStep = ['SIGN_IN', 'SIGN_UP', 'EMAIL_CONFIRMATION'].includes(currentStep)

    return (
        <OnboardingLayout
            leftContent={leftContent}
            rightContent={rightContent}
            isMobileAuthStep={isMobileAuthStep}
        />
    )
}