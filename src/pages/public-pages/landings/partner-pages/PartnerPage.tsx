// Dynamic partner page component that handles all partners based on partnerId prop
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/public-pages/landings/partner-pages/ar.json';
import enLocale from 'locales/public-pages/landings/partner-pages/en.json';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getPartnerConfigs } from './config/partners';
import { PartnerLandingProvider } from './context/PartnerLandingContext';
import { PartnerLayout } from './layout/PartnerLayout';
import { PartnerId } from './config/types';

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
  if (!partnerId || !(partnerId in partnerConfigs)) {
    return <Navigate to="/404" replace />;
  }

  const config = partnerConfigs[partnerId as PartnerId];

  return (
    <PartnerLandingProvider partnerConfig={config}>
      <PartnerLayout />
    </PartnerLandingProvider>
  );
} 