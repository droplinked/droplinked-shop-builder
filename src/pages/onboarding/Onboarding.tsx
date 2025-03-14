import { Flex, Grid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import OnboardingPageHeader from './components/common/OnboardingPageHeader'
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

    if (!rightContent) return leftContent

    return (
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '1fr 1.5fr', '3xl': '1fr 2fr' }}>
            <Flex direction="column" gap={12} padding={{ base: 4, md: 6, lg: 16 }}>
                <OnboardingPageHeader />
                {leftContent}
            </Flex>
            {rightContent}
        </Grid>
    )
}