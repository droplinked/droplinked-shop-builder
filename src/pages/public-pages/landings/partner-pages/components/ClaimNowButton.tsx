// Reusable claim button component for partner landing pages
import { useDisclosure } from '@chakra-ui/react';
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton';
import { useAuthNavigation } from 'hooks/useAuthNavigation/useAuthNavigation';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { usePartnerLanding } from '../context/PartnerLandingContext';
import WalletVerificationModal from './wallet-verification-modal/WalletVerificationModal';

export default function ClaimNowButton({ ...buttonProps }: AppButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocaleResources('public-pages/landings/partner-pages');
  const { partnerId, buttonAction, requiresWalletVerification } = usePartnerLanding();
  const { navigateBasedOnStatus } = useAuthNavigation();

  const handleClaimClick = () => {
    if (buttonAction === 'get-started') {
      navigateBasedOnStatus();
    } else if (requiresWalletVerification) {
      onOpen(); // Open the wallet verification modal
    } else {
      // For partners like crossmint that don't need wallet verification
      navigateBasedOnStatus({ source: partnerId });
    }
  };

  return (
    <>
      <AppButton mt={6} onClick={handleClaimClick} {...buttonProps}>
        {buttonAction === 'get-started' ? t('common:getStarted') : t('common:claimNow')}
      </AppButton>

      {requiresWalletVerification && (
        <WalletVerificationModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
}
