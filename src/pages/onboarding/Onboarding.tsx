import { Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import CompletionSection from './components/completion/CompletionSection'
import DroplinkedBrand from './components/DroplinkedBrand'
import EmailConfirmation from './components/email-confirmation/EmailConfirmation'
import PaymentFeatures from './components/payment-features/PaymentFeatures'
import PaymentSetup from './components/payment-setup/PaymentSetup'
import ProductCards from './components/product-cards/ProductCards'
import ShopPreview from './components/shop-preview/ShopPreview'
import ShopSetupForm from './components/shop-setup/ShopSetupForm'
import SignInForm from './components/sign-in/SignInForm'
import SignUpForm from './components/sign-up/SignUpForm'
import Stepper from './components/Stepper'
import SubscriptionPlan from './components/subscription-plan/SubscriptionPlan'
import SubscriptionPlansDisplay from './components/subscription-plans-display/SubscriptionPlansDisplay'
import useOnboardingStore from './stores/useOnboardingStore'

function Onboarding() {
    const { currentStep, nextStep, prevStep } = useOnboardingStore()

    const stepContent = {
        1: {
            leftContent: <SignInForm onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        2: {
            leftContent: <SignUpForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        3: {
            leftContent: <EmailConfirmation onBack={prevStep} onNext={nextStep} />,
            rightContent: <ProductCards />
        },
        4: {
            leftContent: <ShopSetupForm onBack={prevStep} onNext={nextStep} />,
            rightContent: <ShopPreview />
        },
        5: {
            leftContent: <PaymentSetup onBack={prevStep} onNext={nextStep} />,
            rightContent: <PaymentFeatures />
        },
        6: {
            leftContent: <SubscriptionPlan onBack={prevStep} onNext={nextStep} />,
            rightContent: <SubscriptionPlansDisplay />
        },
        7: { leftContent: <CompletionSection /> }
    }

    const { leftContent, rightContent } = stepContent[currentStep]

    if (!rightContent) return leftContent

    return (
        <Grid templateColumns={{ base: '1fr', md: '1fr 1.5fr' }}>
            <Flex direction='column' gap={12} padding={16}>
                <DroplinkedBrand />
                <Stepper />
                {leftContent}
            </Flex>

            {rightContent}
        </Grid>
    )
}

export default Onboarding