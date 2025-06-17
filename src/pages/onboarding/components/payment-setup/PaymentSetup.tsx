import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import ControlButtons from '../common/ControlButtons'
import CurrencySection from './CurrencySection'
import FinancialServices from './FinancialServices'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function PaymentSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const { updateOnboardingState } = useOnboardingStore()
  const { t } = useLocaleResources('onboarding')

  const handleCurrencyLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <>
      <OnboardingStepHeader 
        heading={t('paymentSetup.title')} 
        description={t('paymentSetup.subtitle')} 
      />
      <Flex direction="column" minH="calc(100vh - 250px)" gap="36px">
        <FinancialServices />
        <CurrencySection onLoadingChange={handleCurrencyLoading} />
        <ControlButtons 
          onBack={() => updateOnboardingState('currentStep', 'STORE_DETAILS')} 
          onSubmit={() => updateOnboardingState('currentStep', 'PLAN_SELECTION')} 
          onSkip={() => updateOnboardingState('currentStep', 'PLAN_SELECTION')} 
          showBackButton={false} 
          isLoading={isLoading}
        />
      </Flex>
    </>
  )
}

export default PaymentSetup
