import { Flex } from '@chakra-ui/react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'
import ControlButtons from '../common/ControlButtons'
import CurrencySection from './CurrencySection'
import FinancialServices from './FinancialServices'
import OnboardingStepHeader from '../common/OnboardingStepHeader'

function PaymentSetup({ onBack, onNext }: OnboardingStepProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCurrencyLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <>
      <OnboardingStepHeader heading="Basic Payment Details" description="Choose to activate any of the options below." />
      <Flex direction="column" minH="calc(100vh - 250px)" gap="36px">
        <FinancialServices />
        <CurrencySection onLoadingChange={handleCurrencyLoading} />
        <ControlButtons 
          onBack={onBack} 
          onSubmit={onNext} 
          onSkip={onNext} 
          showBackButton={false} 
          isLoading={isLoading}
        />
      </Flex>
    </>
  )
}

export default PaymentSetup
