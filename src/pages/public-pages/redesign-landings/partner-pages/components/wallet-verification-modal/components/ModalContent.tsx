import React from 'react';
import { Flex } from '@chakra-ui/react';
import { StepsType } from '../../../context/WalletVerificationContext';
import FeatureList from './FeatureList';
import ModalButtons from './ModalButtons';
import ModalHeader from './ModalHeader';

interface ModalContentProps {
  currentStep: StepsType;
  trialMonths: number;
  onClose: () => void;
  onConnectWallet: () => Promise<void>;
  onResetStep: () => void;
  onClaimNow: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  currentStep,
  trialMonths,
  onClose,
  onConnectWallet,
  onResetStep,
  onClaimNow,
}) => {
  return (
    <Flex
      padding={{ base: '0px 16px 36px 16px', md: '0px 48px 48px 48px' }}
      flexDirection="column"
      alignItems="flex-end"
      gap="48px"
      alignSelf="stretch"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gap="24px"
        alignSelf="stretch"
      >
        <ModalHeader currentStep={currentStep} trialMonths={trialMonths} />
        <FeatureList trialMonths={trialMonths} />
        <ModalButtons
          currentStep={currentStep}
          onClose={onClose}
          onConnectWallet={onConnectWallet}
          onResetStep={onResetStep}
          onClaimNow={onClaimNow}
        />
      </Flex>
    </Flex>
  );
};

export default ModalContent; 