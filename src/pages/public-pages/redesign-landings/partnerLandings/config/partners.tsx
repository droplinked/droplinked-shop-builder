import React from 'react';
import D3Logo from 'assets/brand-identity/D3';
import UnstoppableDomainsLogo from 'assets/brand-identity/UnstoppableDomains';
import PolygonLogo from 'assets/brand-identity/Polygon';
import CrossmintLogo from 'assets/brand-identity/Crossmint';
import { PartnerConfig, Section } from './types';
import MarqueeSection from '../../_shared/components/marquee-wrapper/MarqueeSection';
import JoinTheCommuity from '../../_shared/components/JoinTheCommuity';
import SetOfPerks from '../components/SetOfPerks';
import ModularStack from '../components/ModularStack';
import ClaimNow from '../components/ClaimNow';
import D3BentoGrids from '../components/partner-specific/D3BentoGrids';
import UDTldFeatures from '../components/partner-specific/UDTldFeatures';

/**
 * Helper function to build partner landing page sections
 * 
 * @param partnerId - Unique identifier for the partner
 * @param partnerName - Display name for the partner
 * @param trialMonths - Number of trial months offered
 * @param customSections - Array of partner-specific sections to insert after partners section
 * 
 * Default section order:
 * 1. partners (MarqueeSection)
 * 2. [custom sections inserted here]
 * 3. set-of-perks
 * 4. modular-stack
 * 5. join-community
 * 6. claim-now
 */
const buildSections = (
  partnerId: string,
  partnerName: string,
  trialMonths: number,
  customSections: Section[] = []
): Section[] => {
  const defaultSections: Section[] = [
    { id: 'partners', component: <MarqueeSection /> },
    { id: 'set-of-perks', component: <SetOfPerks partnerName={partnerName} trialMonths={trialMonths} /> },
    { id: 'modular-stack', component: <ModularStack partnerId={partnerId} partnerName={partnerName} trialMonths={trialMonths} /> },
    { id: 'join-community', component: <JoinTheCommuity /> },
    { id: 'claim-now', component: <ClaimNow partnerId={partnerId} trialMonths={trialMonths} /> },
  ];

  // Insert custom sections after partners section (index 1)
  const sections = [...defaultSections];
  customSections.forEach((customSection, index) => {
    sections.splice(1 + index, 0, customSection);
  });

  return sections;
};

/**
 * Partner landing page configurations
 * 
 * To add a new partner:
 * 1. Add partner ID to PartnerId type in types.ts
 * 2. Create partner-specific components in components/partner-specific/
 * 3. Add configuration here with logo, hero content, and sections
 * 4. Create partner page file (e.g., NewPartner.tsx) using PartnerLayout
 * 5. Add route in routes.tsx
 * 
 * Each partner gets default sections + optional custom sections
 */
export const PARTNER_CONFIGS: Record<string, PartnerConfig> = {
  d3: {
    id: 'd3',
    name: 'D3',
    displayName: 'D3',
    trialMonths: 6,
    logo: D3Logo,
    hero: {
      title: 'Powering \n Agentic Commerce',
      subtitle: 'Crossmint members unlock 6 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today.',
    },
    sections: buildSections('d3', 'D3', 6, [
      { id: 'd3-features', component: <D3BentoGrids /> }
    ])
  },
  
  unstoppableDomains: {
    id: 'unstoppableDomains',
    name: 'Unstoppable Domains',
    displayName: 'Unstoppable Domains',
    trialMonths: 3,
    logo: UnstoppableDomainsLogo,
    hero: {
      title: 'Unstoppable Domains \n Members',
      subtitle: 'Unlock 3 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today as a domain holder',
    },
    sections: buildSections('unstoppableDomains', 'Unstoppable Domains', 3, [
      { id: 'ud-features', component: <UDTldFeatures /> }
    ])
  },
  
  polygon: {
    id: 'polygon',
    name: '.Polygon',
    displayName: '.Polygon',
    trialMonths: 3,
    logo: PolygonLogo,
    hero: {
      title: '.Polygon Domain Holders',
      subtitle: 'Unlock 3 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today as a .polygon domain holder',
    },
    sections: buildSections('polygon', '.Polygon', 3),
  },
  
  crossmint: {
    id: 'crossmint',
    name: 'Crossmint',
    displayName: 'Crossmint',
    trialMonths: 3,
    logo: CrossmintLogo,
    hero: {
      title: 'Powering \n Agentic Commerce',
      subtitle: 'Crossmint members unlock 3 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today.',
    },
    sections: buildSections('crossmint', 'Crossmint', 3),
  }
}; 