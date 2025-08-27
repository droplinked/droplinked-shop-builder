import { Flex } from '@chakra-ui/react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { ArrowleftMd } from 'assets/icons/Navigation/ArrowLeft/ArrowleftMd';
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import { usePartnerLanding } from '../../../context/PartnerLandingContext';
import { StepsType } from '../../../context/WalletVerificationContext';
import './styles/ConnectWallet.css';

interface ModalButtonsProps {
  currentStep: StepsType;
  onClose: () => void;
  onResetStep: () => void;
  onConnectWallet: () => Promise<void>;
  onClaimNow: () => void;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  currentStep,
  onClose,
  onResetStep,
  onConnectWallet,
  onClaimNow,
}) => {
  const { t, isRTL } = useLocaleResources('public-pages/landings/partner-pages');
  const { partnerId } = usePartnerLanding();
  const { address } = useAccount();
  const hasTriggeredVerification = useRef(false);
  const walletConnectionInitiated = useRef(false);

  // Auto-trigger verification for base partner when address becomes available
  // ONLY if wallet connection was initiated by user clicking ConnectWallet
  useEffect(() => {
    if (
      partnerId === 'base' &&
      address &&
      walletConnectionInitiated.current &&
      !hasTriggeredVerification.current &&
      currentStep === 'connect'
    ) {
      hasTriggeredVerification.current = true;
      walletConnectionInitiated.current = false; // Reset the flag
      onConnectWallet();
    }
  }, [partnerId, address, currentStep, onConnectWallet]);

  // Reset verification flag when step changes
  useEffect(() => {
    if (currentStep === 'connect') {
      hasTriggeredVerification.current = false;
    }
  }, [currentStep]);

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

      {partnerId === 'base' ? (
        currentStep === 'connect' && !address ? (
          <ConnectWallet
            onConnect={() => {
              walletConnectionInitiated.current = true;
            }}
          >
            {buttonConfig.right.label}
          </ConnectWallet>
        ) : (
          <AppButton
            fontSize={{ base: '14px', md: '16px' }}
            onClick={() => buttonConfig.right.onClick()}
            {...buttonConfig.right.styles}
          >
            {buttonConfig.right.label}
            {buttonConfig.right.rightIcon}
          </AppButton>
        )
      ) : (
        <AppButton
          fontSize={{ base: '14px', md: '16px' }}
          onClick={() => buttonConfig.right.onClick()}
          {...buttonConfig.right.styles}
        >
          {buttonConfig.right.label}
          {buttonConfig.right.rightIcon}
        </AppButton>
      )}
    </Flex>
  );
};

export default ModalButtons; 