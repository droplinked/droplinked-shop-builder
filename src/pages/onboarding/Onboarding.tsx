import { useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import EmailConfirmation from './components/common/email-confirmation/EmailConfirmation'
import CompletionSection from './components/completion/CompletionSection'
import DesktopLayout from './components/layout/DesktopLayout'
import MobileLayout from './components/layout/MobileLayout'
import TabletLayout from './components/layout/TabletLayout'
import PaymentFeatures from './components/payment-features/PaymentFeatures'
import PaymentSetup from './components/payment-setup/PaymentSetup'
import ProductCards from './components/product-cards/ProductCards'
import PasswordUpdatedForm from './components/reset-password/PasswordUpdatedForm'
import ResetPasswordForm from './components/reset-password/ResetPasswordForm'
import SetNewPasswordForm from './components/reset-password/SetNewPasswordForm'
import ShopPreview from './components/shop-preview/ShopPreview'
import ShopSetupForm from './components/shop-setup/ShopSetupForm'
import SignInForm from './components/sign-in/SignInForm'
import SignUpForm from './components/sign-up/SignUpForm'
import SubscriptionPlansDisplay from './components/subscription-plans-display/SubscriptionPlansDisplay'
import SubscriptionPlans from './components/subscription-plans/SubscriptionPlans'
import useOnboardingStore from './stores/useOnboardingStore'

function Onboarding() {
    const LayoutComponent = useBreakpointValue({ base: MobileLayout, md: TabletLayout, lg: DesktopLayout })
    const { currentStep, updateOnboardingState, nextStep, prevStep } = useOnboardingStore()

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const entry = searchParams.get("entry")

        if (entry === 'signin') updateOnboardingState('currentStep', 'SIGN_IN')
        else if (entry === 'signup') updateOnboardingState('currentStep', 'SIGN_UP')
        else if (entry === 'payment') updateOnboardingState('currentStep', 'PAYMENT_DETAILS')
    }, [updateOnboardingState])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentStep])

    const stepContentMap = {
        'SIGN_IN': {
            leftContent: <SignInForm onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'SIGN_UP': {
            leftContent: <SignUpForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'RESET_PASSWORD': {
            leftContent: <ResetPasswordForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'SIGNUP_EMAIL_VERIFICATION': {
            leftContent: <EmailConfirmation mode='signup' onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'RESET_PASSWORD_VERIFICATION': {
            leftContent: <EmailConfirmation mode='reset' onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'SET_NEW_PASSWORD': {
            leftContent: <SetNewPasswordForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        'PASSWORD_UPDATED': {
            leftContent: <PasswordUpdatedForm />,
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

    const { leftContent, rightContent } = stepContentMap[currentStep]
    const isAuthStep = [
        'SIGN_IN',
        'SIGN_UP',
        'RESET_PASSWORD',
        'SIGNUP_EMAIL_VERIFICATION',
        'RESET_PASSWORD_VERIFICATION',
        'SET_NEW_PASSWORD',
        'PASSWORD_UPDATED'
    ].includes(currentStep)

    return (!rightContent)
        ? leftContent
        : <LayoutComponent leftContent={leftContent} rightContent={rightContent} isAuthStep={isAuthStep} />
}

export default Onboarding