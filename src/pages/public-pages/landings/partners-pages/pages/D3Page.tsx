// D3Page.tsx

import React from "react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { PartnerProvider } from "../context/partner.context";
import LandingHero from "../components/landing-hero/LandingHero";
import AppIcons from "assets/icon/Appicons";
import CollaborationDetails from "../components/CollaborationDetails";
import CollaborationFeatures from "../components/CollaborationFeatures";
import ProPlan from "../components/ProPlan";
import Layout from "../components/Layout";
import D3Community from "../components/D3Community";
import localEn from 'locales/public-pages/landings/partners-pages/en.json';
import localAr from 'locales/public-pages/landings/partners-pages/ar.json';

const D3Page: React.FC = () => {
  const { t } = useLocaleResources('public-pages/landings/partners-pages', { en: localEn , ar:localAr});

  return (
    <PartnerProvider partnerName="D3" partnerLogo={<AppIcons.HeaderD3 />} planType="Pro" planDurationMonths={6}>
      <LandingHero
        heading={t('partners.d3.heading')}
        description={t('partners.d3.description')}
        valueText={t('partners.d3.valueText')}
      />
      <Layout>
        <CollaborationDetails t={t} />
        <CollaborationFeatures t={t} />
        <D3Community t={t} />
        <ProPlan t={t} />
      </Layout>
    </PartnerProvider>
  );
};

export default D3Page;
