import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd';
import AppButton from 'components/redesign/button/AppButton';
import { StepsType } from '../../../context/WalletVerificationContext';

interface ModalButtonsProps {
  currentStep: StepsType;
  onClose: () => void;
  onConnectWallet: () => Promise<void>;
  onResetStep: () => void;
  onClaimNow: () => void;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  currentStep,
  onClose,
  onConnectWallet,
  onResetStep,
  onClaimNow,
}) => {
  const getButtonConfig = () => {
    switch (currentStep) {
      case 'connect':
        return {
          left: {
            label: 'Close',
            onClick: onClose,
            styles: {},
          },
          right: {
            label: 'Check Wallet Eligibility',
            onClick: onConnectWallet,
            rightIcon: <ArrowrightMd />,
            styles: {},
          },
        };
      case 'loading':
        return {
          left: {
            label: 'Close',
            onClick: () => {},
            styles: {
              background: '#292929',
              color: '#737373',
              cursor: 'not-allowed',
            },
          },
          right: {
            label: 'Check Wallet Eligibility',
            onClick: () => {},
            rightIcon: <ArrowrightMd color="#737373" />,
            styles: {
              background: '#292929',
              color: '#737373',
              cursor: 'not-allowed',
              border: 'none',
            },
          },
        };
      case 'error':
        return {
          left: null,
          right: {
            label: 'Return',
            onClick: onResetStep,
            styles: {},
          },
        };
      case 'done':
        return {
          left: null,
          right: {
            label: 'Claim Now',
            onClick: onClaimNow,
            styles: {},
          },
        };
      default:
        return { left: null, right: { label: '', onClick: () => {}, styles: {} } };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap="24px"
      alignSelf="stretch"
    >
      <Flex flex="1 0 0" alignItems="flex-start">
        {buttonConfig.left && (
          <AppButton
            variant="secondary"
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '16px', md: '24px' }}
            onClick={buttonConfig.left.onClick}
            {...buttonConfig.left.styles}
          >
            {buttonConfig.left.label}
          </AppButton>
        )}
      </Flex>
      <AppButton
        fontSize={{ base: '14px', md: '16px' }}
        onClick={buttonConfig.right.onClick}
        {...buttonConfig.right.styles}
      >
        {buttonConfig.right.label}
        {buttonConfig.right.rightIcon}
      </AppButton>
    </Flex>
  );
};

export default ModalButtons; 