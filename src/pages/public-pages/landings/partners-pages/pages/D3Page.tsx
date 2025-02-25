// D3Page.tsx

import React from "react";
import { PartnerProvider } from "../context/partner.context";
import LandingHero from "../components/landing-hero/LandingHero";
import AppIcons from "assets/icon/Appicons";
import CollaborationDetails from "../components/CollaborationDetails";
import CollaborationFeatures from "../components/CollaborationFeatures";
import ProPlan from "../components/ProPlan";
import Layout from "../components/Layout";
import D3Community from "../components/D3Community";

const D3Page: React.FC = () => {
  return (
    <PartnerProvider partnerName="D3" partnerLogo={<AppIcons.HeaderD3 />} planType="Pro" planDurationMonths={6}>
      <LandingHero
        heading="droplinked & D3"
        description="Unlock 6 months of the Pro Plan absolutely free! Redeem the exclusive offer today."
        valueText="$30 Value"
      />
      <Layout>
        <CollaborationDetails />
        <CollaborationFeatures />
        <D3Community />
        <ProPlan />
      </Layout>
    </PartnerProvider>
  );
};

export default D3Page;
