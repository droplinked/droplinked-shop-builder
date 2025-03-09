import { Flex } from '@chakra-ui/react';
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding';
import React from 'react';
import ControlButtons from '../common/ControlButtons';
import CurrencySection from './components/CurrencySection';
import FinancialServices from './components/financial-servic/FinancialServices';

function PaymentSetup({ onBack, onNext }: OnboardingStepProps) {
  return (
    <Flex direction="column" minH="full" gap="36px">
      <FinancialServices />
      <CurrencySection />
      <ControlButtons onBack={onBack} onSubmit={onNext} onSkip={onNext} />
    </Flex>
  );
}

export default PaymentSetup;
