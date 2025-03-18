import { useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CompletionSection from './components/completion/CompletionSection'
import EmailConfirmation from './components/email-confirmation/EmailConfirmation'
import DesktopLayout from './components/layout/DesktopLayout'
import MobileLayout from './components/layout/MobileLayout'
import TabletLayout from './components/layout/TabletLayout'
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
import useAppStore from 'lib/stores/app/appStore'

function Onboarding() {
    const LayoutComponent = useBreakpointValue({ base: MobileLayout, md: TabletLayout, lg: DesktopLayout })
    const [searchParams] = useSearchParams()
    const { isLoggedIn } = useAppStore()
    const { currentStep, updateOnboardingState, nextStep, prevStep, credentials } = useOnboardingStore()

    useEffect(() => {
        if (!isLoggedIn && !credentials.email)
            return updateOnboardingState('currentStep', 'SIGN_IN')

        const entry = searchParams.get('entry')?.toLowerCase()
        if (entry === 'signin') updateOnboardingState('currentStep', 'SIGN_IN')
        else if (entry === 'signup') updateOnboardingState('currentStep', 'SIGN_UP')
        else if (entry === 'email-confirmation') updateOnboardingState('currentStep', 'EMAIL_CONFIRMATION')
        else if (entry === 'store-details') updateOnboardingState('currentStep', 'STORE_DETAILS')
    }, [isLoggedIn, credentials, updateOnboardingState, searchParams])

    useEffect(function scrollToTop() {
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

    const { leftContent, rightContent } = stepContentMap[currentStep]
    const isAuthStep = ['SIGN_IN', 'SIGN_UP', 'EMAIL_CONFIRMATION'].includes(currentStep)

    return (!rightContent)
        ? leftContent
        : <LayoutComponent leftContent={leftContent} rightContent={rightContent} isAuthStep={isAuthStep} />
}

export default Onboarding