import AppIcons from "assets/icon/Appicons";
import React from "react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import CollaborationDetails from "../components/CollaborationDetails";
import CollaborationFeatures from "../components/CollaborationFeatures";
import LandingHero from "../components/landing-hero/LandingHero";
import Layout from "../components/Layout";
import ProPlan from "../components/ProPlan";
import { PartnerProvider } from "../context/partner.context";
import localEn from 'locales/public-pages/landings/partners-pages/en.json';
import localAr from 'locales/public-pages/landings/partners-pages/ar.json'

function PolygonPage() {
  const { t } = useLocaleResources('public-pages/landings/partners-pages', { en: localEn , ar: localAr});

  return (
    <PartnerProvider
      partnerName="Polygon"
      partnerLogo={<AppIcons.HeaderPolygon />}
      planType="Pro"
      planDurationMonths={3}
    >
      <LandingHero
        heading={t('partners.polygon.heading')}
        description={t('partners.polygon.description')}
      />
      <Layout>
        <CollaborationDetails t={t} />
        <CollaborationFeatures t={t} />
        <ProPlan t={t} />
      </Layout>
    </PartnerProvider>
  );
}

export default PolygonPage;
