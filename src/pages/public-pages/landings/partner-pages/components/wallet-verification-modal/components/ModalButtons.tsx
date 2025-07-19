import { Flex } from '@chakra-ui/react';
import { ArrowleftMd } from 'assets/icons/Navigation/ArrowLeft/ArrowleftMd';
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
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
  const { t, isRTL } = useLocaleResources('public-pages/landings/partner-pages');

  const getButtonConfig = () => {
    switch (currentStep) {
      case 'connect':
        return {
          left: {
            label: t('close'),
            onClick: onClose,
            styles: {},
          },
          right: {
            label: t('ModalButtons.checkEligibilityLabel'),
            onClick: onConnectWallet,
            rightIcon: isRTL ? <ArrowleftMd /> : <ArrowrightMd />,
            styles: {},
          },
        };
      case 'loading':
        return {
          left: {
            label: t('close'),
            onClick: () => { },
            styles: {
              background: '#292929',
              color: '#737373',
              cursor: 'not-allowed',
            },
          },
          right: {
            label: t('ModalButtons.checkEligibilityLabel'),
            onClick: () => { },
            rightIcon: isRTL ? <ArrowleftMd color="#737373" /> : <ArrowrightMd color="#737373" />,
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
            label: t('return'),
            onClick: onResetStep,
            styles: {},
          },
        };
      case 'done':
        return {
          left: null,
          right: {
            label: t('claimNow'),
            onClick: onClaimNow,
            styles: {},
          },
        };
      default:
        return { left: null, right: { label: '', onClick: () => { }, styles: {} } };
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