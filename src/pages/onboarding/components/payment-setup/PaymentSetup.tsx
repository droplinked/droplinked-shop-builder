import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useSubscription from 'hooks/subscription/useSubscription'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useState } from 'react'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import CurrencySection from './CurrencySection'
import FinancialServices from './FinancialServices'

function PaymentSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const { updateOnboardingState } = useOnboardingStore()
  const { t } = useLocaleResources('onboarding')
  const { hasPaidSubscription } = useSubscription()

  const handleCurrencyLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  const handleNextStep = () => {
    const nextStep = hasPaidSubscription ? 'YOU_ARE_ALL_SET' : 'PLAN_SELECTION'
    updateOnboardingState('currentStep', nextStep)
  }

  return (
    <>
      <OnboardingStepHeader
        heading={t('PaymentSetup.title')}
        description={t('PaymentSetup.subtitle')}
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
