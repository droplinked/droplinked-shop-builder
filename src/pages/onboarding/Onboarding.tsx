import { useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'
import React from 'react'
import EmailConfirmation from './components/common/email-confirmation/EmailConfirmation'
import CompletionSection from './components/completion/CompletionSection'
import ExistingWebsite from './components/existing-website/ExistingWebsite'
import ExistingWebsiteVisual from './components/existing-website/ExistingWebsiteVisual'
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
import { useOnboardingLifecycle } from './hooks/useOnboardingLifecycle'

export function meta() {
  return [
    { title: 'Create an Account | Droplinked' },
    {
      name: 'description',
      content:
        'Sign up for Droplinked to access our powerful onchain commerce platform. Start selling physical goods, digital assets, and tokenized products today.',
    },
    {
      name: 'keywords',
      content: 'Droplinked sign up, Create Droplinked account, Droplinked registration, Onchain commerce account',
    },
    {
      property: 'og:title',
      content: 'Create an Account | Droplinked',
    },
    {
      property: 'og:description',
      content:
        'Sign up for Droplinked to access our powerful onchain commerce platform. Start selling physical goods, digital assets, and tokenized products today.',
    },
  ]
}

function Onboarding() {
  const LayoutComponent = useBreakpointValue({ base: MobileLayout, md: TabletLayout, lg: DesktopLayout })
  const { currentStep } = useOnboardingLifecycle()
  useLocaleResources('onboarding', { en: enLocale, ar: arLocale })

  const stepContentMap = {
    SIGN_IN: { leftContent: <SignInForm />, rightContent: <ProductCards />, isAuthStep: true },
    SIGN_UP: { leftContent: <SignUpForm />, rightContent: <ProductCards />, isAuthStep: true },
    SIGNUP_EMAIL_VERIFICATION: { leftContent: <EmailConfirmation mode="signup" />, rightContent: <ProductCards />, isAuthStep: true },
    RESET_PASSWORD: { leftContent: <ResetPasswordForm />, rightContent: <ProductCards />, isAuthStep: true },
    RESET_PASSWORD_VERIFICATION: { leftContent: <EmailConfirmation mode="reset" />, rightContent: <ProductCards />, isAuthStep: true },
    SET_NEW_PASSWORD: { leftContent: <SetNewPasswordForm />, rightContent: <ProductCards />, isAuthStep: true },
    PASSWORD_UPDATED: { leftContent: <PasswordUpdatedForm />, rightContent: <ProductCards />, isAuthStep: true },
    EXISTING_WEBSITE: { leftContent: <ExistingWebsite />, rightContent: <ExistingWebsiteVisual />, isAuthStep: false },
    STORE_DETAILS: { leftContent: <ShopSetupForm />, rightContent: <ShopPreview />, isAuthStep: false },
    PAYMENT_DETAILS: { leftContent: <PaymentSetup />, rightContent: <PaymentFeatures />, isAuthStep: false },
    PLAN_SELECTION: { leftContent: <SubscriptionPlans />, rightContent: <SubscriptionPlansDisplay />, isAuthStep: false },
    YOU_ARE_ALL_SET: { leftContent: <CompletionSection />, rightContent: null, isAuthStep: false },
  }

  const { leftContent, rightContent, isAuthStep } = stepContentMap[currentStep]

  return rightContent
    ? <LayoutComponent leftContent={leftContent} rightContent={rightContent} isAuthStep={isAuthStep} />
    : leftContent
}

export default Onboarding