import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useState } from 'react'
import useAppStore from 'stores/app/appStore'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import CurrencySection from './CurrencySection'
import FinancialServices from './FinancialServices'

function PaymentSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const { updateOnboardingState } = useOnboardingStore()
  const { hasPaidSubscription } = useAppStore()

  const handleCurrencyLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  const handleNextStep = () => {
    const nextStep = hasPaidSubscription() ? 'YOU_ARE_ALL_SET' : 'PLAN_SELECTION'
    updateOnboardingState('currentStep', nextStep)
  }

  return (
    <>
      <OnboardingStepHeader
        heading="Basic Payment Details"
        description="Choose to activate any of the options below."
      />
      <FinancialServices />
      <CurrencySection onLoadingChange={handleCurrencyLoading} />
      <ControlButtons
        onBack={() => updateOnboardingState('currentStep', 'STORE_DETAILS')}
        onSubmit={handleNextStep}
        onSkip={handleNextStep}
        showBackButton={false}
        isLoading={isLoading}
      />
    </>
  )
}

export default PaymentSetup