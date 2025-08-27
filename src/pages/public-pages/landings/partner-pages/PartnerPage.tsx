// Dynamic partner page component that handles all partners based on partnerId prop
import { OnchainKitProvider } from "@coinbase/onchainkit";
import '@coinbase/onchainkit/styles.css';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/public-pages/landings/partner-pages/ar.json';
import enLocale from 'locales/public-pages/landings/partner-pages/en.json';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { base } from 'wagmi/chains';
import { getPartnerConfigs } from './config/partners';
import { PartnerId } from './config/types';
import { PartnerLandingProvider } from './context/PartnerLandingContext';
import { PartnerLayout } from './layout/PartnerLayout';

interface PartnerPageProps {
  partnerId: string;
}

export default function PartnerPage({ partnerId }: PartnerPageProps) {
  const { t } = useLocaleResources('public-pages/landings/partner-pages', {
    en: enLocale,
    ar: arLocale
  });

  const partnerConfigs = getPartnerConfigs(t);

  // Validate partner ID and get config
  if (!(partnerId in partnerConfigs)) {
    return <Navigate to="/404" replace />;
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
    <OnchainKitProvider
      apiKey={process.env.REACT_APP_ONCHAINKIT_API_KEY}
      chain={base}
    >
      <PartnerLandingProvider partnerConfig={config}>
        <PartnerLayout />
      </PartnerLandingProvider>
    </OnchainKitProvider>
  );
} 