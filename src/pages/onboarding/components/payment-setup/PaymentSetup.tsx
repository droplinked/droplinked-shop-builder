import { Flex } from '@chakra-ui/react';
import React from 'react';
import ControlButtons from '../common/ControlButtons';
import FinancialServices from './components/financial-servic/FinancialServices';
import CurrencySection from './components/CurrencySection';

interface props {
  onBack: () => void;
  onNext: () => void;
}

function PaymentSetup({ onBack, onNext }: props) {
  return (
    <Flex direction="column" minH="full" gap="36px">
      <FinancialServices />
      <CurrencySection />
      <ControlButtons onBack={onBack} onSubmit={onNext} onSkip={onNext} />
    </Flex>
  );
}

export default PaymentSetup;
