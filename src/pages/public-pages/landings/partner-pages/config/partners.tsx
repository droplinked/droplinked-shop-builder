import CrossmintLogo from 'assets/brand-identity/Crossmint';
import D3Logo from 'assets/brand-identity/D3';
import PolygonLogo from 'assets/brand-identity/Polygon';
import UnstoppableDomainsLogo from 'assets/brand-identity/UnstoppableDomains';
import { BaseLogo } from 'assets/logo/NetworkAndTokens/Coinbase/Base/BaseLogo';
import { TFunction } from 'i18next';
import JoinCommunity from 'pages/public-pages/landings/_shared/components/JoinCommunity';
import MarqueeSection from 'pages/public-pages/landings/_shared/components/marquee-wrapper/MarqueeSection';
import ClaimNow from 'pages/public-pages/landings/partner-pages/components/ClaimNow';
import ModularStack from 'pages/public-pages/landings/partner-pages/components/ModularStack';
import PerkList from 'pages/public-pages/landings/partner-pages/components/PerkList';
import D3BentoGrids from 'pages/public-pages/landings/partner-pages/components/partner-specific/D3BentoGrids';
import UDTldFeatures from 'pages/public-pages/landings/partner-pages/components/partner-specific/UDTldFeatures';
import React from 'react';
import { PartnerId, Section } from './types';
import BaseGetStartedSection from '../components/partner-specific/BaseGetStartedSection';

/**
 * PARTNER LANDING PAGE CONFIGURATION
 * 
 * This file configures partner-specific landing pages with flexible section positioning.
 * 
 * 
 * DEFAULT SECTION ORDER:
 * 1. partner-list (MarqueeSection) - excluded for base partner
 * 2. perk-list
 * 3. modular-stack
 * 4. join-community
 * 5. claim-now
 */

export interface PartnerConfig {
  id: PartnerId;
  name: string;
  displayName: string;
  trialMonths: number;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
  };
  sections: Section[];
}

/**
 * Simple function to build partner landing page sections
 * 
 * @param t - Translation function
 * @param partnerId - Partner ID to determine if partner-list should be shown
 * @param customSections - Array of partner-specific sections
 * 
 * Custom sections can use:
 * - position: number → Insert at specific index
 * - No position → Insert at default position (index 1)
 */
const buildSections = (
  t: TFunction,
  partnerId: PartnerId,
  customSections: Section[] = []
): Section[] => {
  const defaultSections: Section[] = [
    // Only show partner-list for non-base partners
    ...(partnerId !== 'base' ? [{ id: 'partner-list', component: <MarqueeSection /> }] : []),
    { id: 'perk-list', component: <PerkList /> },
    { id: 'modular-stack', component: <ModularStack /> },
    { id: 'join-community', component: <JoinCommunity /> },
    { id: 'claim-now', component: <ClaimNow /> },
  ];

  // Add custom sections
  const sections = [...defaultSections];
  
  customSections.forEach((customSection) => {
    const position = customSection.position ?? 1; // Default to position 1
    sections.splice(position, 0, customSection);
  });

  return sections;
};

/**
 * Get partner landing page configurations with i18n support
 * 
 * @param t - Translation function from i18next
 * @returns Record of partner configurations
 */
export const getPartnerConfigs = (t: TFunction): Record<string, PartnerConfig> => ({
  d3: {
    id: 'd3',
    name: t('PartnerConfig.d3.name'),
    displayName: t('PartnerConfig.d3.displayName'),
    trialMonths: Number(t('PartnerConfig.d3.trialMonths')),
    logo: D3Logo,
    hero: {
      title: t('PartnerHero.d3.title'),
      subtitle: t('PartnerHero.d3.subtitle'),
    },
    sections: buildSections(t, 'd3', [
      { 
        id: 'd3-features', 
        component: <D3BentoGrids />,
      }
    ])
  },

  unstoppableDomains: {
    id: 'unstoppableDomains',
    name: t('PartnerConfig.unstoppableDomains.name'),
    displayName: t('PartnerConfig.unstoppableDomains.displayName'),
    trialMonths: Number(t('PartnerConfig.unstoppableDomains.trialMonths')),
    logo: UnstoppableDomainsLogo,
    hero: {
      title: t('PartnerHero.unstoppableDomains.title'),
      subtitle: t('PartnerHero.unstoppableDomains.subtitle'),
    },
    sections: buildSections(t, 'unstoppableDomains', [
      { 
        id: 'ud-features', 
        component: <UDTldFeatures />,
      }
    ])
  },

  polygon: {
    id: 'polygon',
    name: t('PartnerConfig.polygon.name'),
    displayName: t('PartnerConfig.polygon.displayName'),
    trialMonths: Number(t('PartnerConfig.polygon.trialMonths')),
    logo: PolygonLogo,
    hero: {
      title: t('PartnerHero.polygon.title'),
      subtitle: t('PartnerHero.polygon.subtitle'),
    },
    sections: buildSections(t, 'polygon', []),
  },

  crossmint: {
    id: 'crossmint',
    name: t('PartnerConfig.crossmint.name'),
    displayName: t('PartnerConfig.crossmint.displayName'),
    trialMonths: Number(t('PartnerConfig.crossmint.trialMonths')),
    logo: CrossmintLogo,
    hero: {
      title: t('PartnerHero.crossmint.title'),
      subtitle: t('PartnerHero.crossmint.subtitle'),
    },
    sections: buildSections(t, 'crossmint', []),
  },

  base :{
    id: 'base',
    name: t('PartnerConfig.base.name'),
    displayName: t('PartnerConfig.base.displayName'),
    trialMonths: Number(t('PartnerConfig.base.trialMonths')),
    logo: BaseLogo,
    hero: {
      title: t('PartnerHero.base.title'),
      subtitle: t('PartnerHero.base.subtitle'),
    },
    sections: buildSections(t, 'base', [
      {
        id: 'base-get-started',
        component: <BaseGetStartedSection />,
        position: 1
      }
    ]),
  }


}); 