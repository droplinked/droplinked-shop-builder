// Reusable claim button component for partner landing pages
import { useDisclosure } from '@chakra-ui/react';
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton';
import { useAuthNavigation } from 'hooks/useAuthNavigation/useAuthNavigation';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { usePartnerLanding } from '../context/PartnerLandingContext';
import WalletVerificationModal from './wallet-verification-modal/WalletVerificationModal';
import localEn from 'locales/public-pages/landings/partner-pages/en.json';
import localAr from 'locales/public-pages/landings/partner-pages/ar.json';

export default function ClaimNowButton({ ...buttonProps }: AppButtonProps) {
  const { t } = useLocaleResources('public-pages/landings/partner-pages', {
    en: localEn,
    ar: localAr
  });
  const { partnerId } = usePartnerLanding();
  const { navigateBasedOnStatus } = useAuthNavigation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClaimClick = () => {
    switch (partnerId) {
      case 'd3':
      case 'unstoppableDomains':
      case 'polygon':
        onOpen(); // Open the wallet verification modal
        break;
      case 'crossmint':
        // Call the actual crossmint navigation
        navigateBasedOnStatus({ source: 'crossmint' });
        break;
      default:
        console.log('Unknown partner ID:', partnerId);
    }
  };

  return (
    <>
      <AppButton mt={6} onClick={handleClaimClick} {...buttonProps}>
        {t('claimNow')}
      </AppButton>

      {['d3', 'unstoppableDomains', 'polygon'].includes(partnerId) && (
        <WalletVerificationModal isOpen={isOpen}  onClose={onClose} />
      )}
    </>
  );
}
