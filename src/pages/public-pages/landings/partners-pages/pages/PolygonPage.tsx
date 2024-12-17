import React from "react";
import LandingHero from "../components/landing-hero/LandingHero";
import AppIcons from "assest/icon/Appicons";
import CollaborationDetails from "../components/CollaborationDetails";
import CollaborationFeatures from "../components/CollaborationFeatures";
import ProPlan from "../components/ProPlan";
import Layout from "../components/Layout";
import { PartnerProvider } from "../context/partner.context";

function UdPage() {
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

export default UdPage;
