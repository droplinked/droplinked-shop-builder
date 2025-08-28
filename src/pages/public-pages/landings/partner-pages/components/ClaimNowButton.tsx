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
  const { partnerId, buttonAction } = usePartnerLanding();
  const { navigateBasedOnStatus } = useAuthNavigation();

  const handleClaimClick = () => {
    switch (partnerId) {
      case 'gaia':
        navigateBasedOnStatus();
        break;
      case 'crossmint':
        navigateBasedOnStatus({ source: partnerId });
        break;
      default:
        // For partners that require wallet verification
        onOpen();
        break;
    }
  };

  return (
    <>
      <AppButton mt={6} onClick={handleClaimClick} {...buttonProps}>
        {buttonAction === 'get-started' ? t('common:getStarted') : t('common:claimNow')}
      </AppButton>

      { partnerId && (
        <WalletVerificationModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
}
