// Dynamic partner page component that handles all partners based on partnerId prop
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PartnerLayout } from './layout/PartnerLayout';
import { PartnerLandingProvider } from './context/PartnerLandingContext';
import { getPartnerConfigs } from './config/partners';
import { PartnerId } from './config/partners';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/public-pages/landings/partner-pages/en.json';
import localAr from 'locales/public-pages/landings/partner-pages/ar.json';

interface PartnerPageProps {
  partnerId: string;
}

export default function PartnerPage({ partnerId }: PartnerPageProps) {
  const { t } = useLocaleResources('public-pages/landings/partner-pages', {
    en: localEn,
    ar: localAr
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