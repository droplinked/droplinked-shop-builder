// Dynamic partner page component that handles all partners based on partnerId prop
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/public-pages/landings/partner-pages/ar.json';
import enLocale from 'locales/public-pages/landings/partner-pages/en.json';
import React from 'react';
import { getPartnerConfigs } from './config/partners';
import { PartnerLandingProvider } from './context/PartnerLandingContext';
import { PartnerLayout } from './layout/PartnerLayout';
import { PartnerId } from './config/types';
import { useNavigate } from 'react-router-dom';

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

  return (
    <PartnerLandingProvider partnerConfig={config}>
      <PartnerLayout />
    </PartnerLandingProvider>
  );
} 