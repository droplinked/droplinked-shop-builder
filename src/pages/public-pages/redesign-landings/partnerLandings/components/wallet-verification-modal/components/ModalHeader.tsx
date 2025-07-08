import React from 'react';
import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { StepsType } from '../../../context/WalletVerificationContext';

interface ModalHeaderProps {
  currentStep: StepsType;
  trialMonths: number;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ currentStep, trialMonths }) => {
  const getStepContent = () => {
    switch (currentStep) {
      case 'connect':
        return {
          title: 'Connect Wallet for Verification',
          description: `Connect your wallet to check if you're eligible for the ${trialMonths} month Pro Plan`
        };
      case 'loading':
        return {
          title: 'Verifying Wallet Status',
          description: 'Please wait while your wallet is verified for eligibility.'
        };
      case 'error':
        return {
          title: 'Wallet Verification Unsuccessful',
          description: "It looks like your wallet doesn't meet the criteria. Unfortunately, you're not eligible to claim the offer."
        };
      case 'done':
        return {
          title: 'Congrats, Wallet Offer Verified',
          description: `You can now create an account and enjoy ${trialMonths} months of a Pro Plan.`
        };
      default:
        return { title: '', description: '' };
    }
  };

  const { title, description } = getStepContent();

  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      gap="24px"
      alignSelf="stretch"
    >
      <AppTypography
        color="#FFF"
        fontSize={{ base: '18px', md: '24px' }}
        fontWeight="700"
      >
        {title}
      </AppTypography>
      <AppTypography
        color="#B1B1B1"
        fontSize={{ base: '14px', md: '16px' }}
        fontWeight="400"
      >
        {description}
      </AppTypography>
    </Flex>
  );
};

export default ModalHeader; 