import React from "react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import LandingHero from "../components/landing-hero/LandingHero";
import AppIcons from "assets/icon/Appicons";
import CollaborationDetails from "../components/CollaborationDetails";
import CollaborationFeatures from "../components/CollaborationFeatures";
import ProPlan from "../components/ProPlan";
import Layout from "../components/Layout";
import { PartnerProvider } from "../context/partner.context";
import FeaturedTlds from "../components/FeaturedTlds";
import localEn from 'locales/public-pages/landings/partners-pages/en.json';
import localAr from 'locales/public-pages/landings/partners-pages/ar.json';


function UdPage() {
  const { t } = useLocaleResources('public-pages/landings/partners-pages', { en: localEn , ar: localAr });

  return (
    <PartnerProvider
      partnerName="Unstoppable Domains"
      partnerLogo={<AppIcons.HeaderUd />}
      planType="Pro"
      planDurationMonths={3}
    >
      <LandingHero
        heading={t('partners.ud.heading')}
        description={t('partners.ud.description')}
      />
      <Layout>
        <FeaturedTlds />
        <CollaborationDetails t={t} />
        <CollaborationFeatures t={t} />
        <ProPlan t={t} />
      </Layout>
    </PartnerProvider>
  );
}

export default UdPage;
