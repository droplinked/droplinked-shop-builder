import AppIcons from "assest/icon/Appicons";
import React from "react";
import CollaborationDetails from "../components/CollaborationDetails";
import CollaborationFeatures from "../components/CollaborationFeatures";
import LandingHero from "../components/landing-hero/LandingHero";
import Layout from "../components/Layout";
import ProPlan from "../components/ProPlan";
import { PartnerProvider } from "../context/partner.context";

function PolygonPage() {
  return (
    <PartnerProvider
      partnerName="Polygon"
      partnerLogo={<AppIcons.HeaderPolygon />}
      planType="Pro"
      planDurationMonths={3}
    >
      <LandingHero
        heading="droplinked & Polygon"
        description="Unlock 3 months of the Pro Plan absolutely free! Redeem the exclusive offer today as a .polygon domain holder."
      />
      <Layout>
        <CollaborationDetails />
        <CollaborationFeatures />
        <ProPlan />
      </Layout>
    </PartnerProvider>
  );
}

export default PolygonPage;
