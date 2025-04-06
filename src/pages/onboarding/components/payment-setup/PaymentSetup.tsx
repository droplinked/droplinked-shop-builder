import { Flex } from '@chakra-ui/react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import ControlButtons from '../common/ControlButtons'
import CurrencySection from './CurrencySection'
import FinancialServices from './FinancialServices'
import OnboardingStepHeader from '../common/OnboardingStepHeader'

function PaymentSetup({ onBack, onNext }: OnboardingStepProps) {
  return (
    <>
      <OnboardingStepHeader heading="Basic Payment Details" description="Choose to activate any of the options below." />
      <Flex direction="column" minH="calc(100vh - 250px)" gap="36px">
        <FinancialServices />
        <CurrencySection />
        <ControlButtons onBack={onBack} onSubmit={onNext} onSkip={onNext} showBackButton={false} />
      </Flex>
    </>

  )
}

export default PaymentSetup
