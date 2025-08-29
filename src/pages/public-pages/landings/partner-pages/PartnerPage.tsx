// Dynamic partner page component that handles all partners based on partnerId prop
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import '@coinbase/onchainkit/styles.css';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/public-pages/landings/partner-pages/ar.json';
import enLocale from 'locales/public-pages/landings/partner-pages/en.json';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base } from 'wagmi/chains';
import { getPartnerConfigs } from './config/partners';
import { PartnerId } from './config/types';
import { PartnerLandingProvider } from './context/PartnerLandingContext';
import { PartnerLayout } from './layout/PartnerLayout';

interface PartnerPageProps {
  partnerId: string;
}

export default function PartnerPage({ partnerId }: PartnerPageProps) {
  const navigate = useNavigate()
  const { t } = useLocaleResources('public-pages/landings/partner-pages', {
    en: enLocale,
    ar: arLocale
  });

  const partnerConfigs = getPartnerConfigs(t);

  // Validate partner ID and get config
  if (!partnerId || !(partnerId in partnerConfigs)) {
    return navigate("/404", { replace: true })
  }

  const config = partnerConfigs[partnerId as PartnerId];

  // Clean up base localStorage when navigating away from base partner page
  useEffect(() => {
    return () => {
      if (partnerId === "base") {
        localStorage.removeItem('base-acc-sdk.store');
      }
    };
  }, [partnerId]);

  return (
    <MiniKitProvider
      apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <PartnerLandingProvider partnerConfig={config}>
        <PartnerLayout />
      </PartnerLandingProvider>
    </MiniKitProvider>
  );
} 