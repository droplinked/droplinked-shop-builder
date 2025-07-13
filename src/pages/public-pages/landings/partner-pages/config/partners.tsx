import CrossmintLogo from 'assets/brand-identity/Crossmint';
import D3Logo from 'assets/brand-identity/D3';
import PolygonLogo from 'assets/brand-identity/Polygon';
import UnstoppableDomainsLogo from 'assets/brand-identity/UnstoppableDomains';
import React from 'react';
import { TFunction } from 'i18next';
import JoinCommunity from 'pages/public-pages/landings/_shared/components/JoinCommunity';
import MarqueeSection from 'pages/public-pages/landings/_shared/components/marquee-wrapper/MarqueeSection';
import ClaimNow from 'pages/public-pages/landings/partner-pages/components/ClaimNow';
import ModularStack from 'pages/public-pages/landings/partner-pages/components/ModularStack';
import D3BentoGrids from 'pages/public-pages/landings/partner-pages/components/partner-specific/D3BentoGrids';
import UDTldFeatures from 'pages/public-pages/landings/partner-pages/components/partner-specific/UDTldFeatures';
import PerkList from 'pages/public-pages/landings/partner-pages/components/PerkList';
import { Section } from './types';

export interface PartnerConfig {
  id: PartnerId;
  name: string;
  displayName: string;
  trialMonths: 3 | 6 | 12;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
  };
  sections: Section[];
}

export type PartnerId = 'd3' | 'unstoppableDomains' | 'polygon' | 'crossmint';

/**
 * Helper function to build partner landing page sections
 * 
 * @param t - Translation function
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
  t: TFunction,
  customSections: Section[] = []
): Section[] => {
  const defaultSections: Section[] = [
    { id: 'partners', component: <MarqueeSection /> },
    { id: 'set-of-perks', component: <PerkList /> },
    { id: 'modular-stack', component: <ModularStack /> },
    { id: 'join-community', component: <JoinCommunity /> },
    { id: 'claim-now', component: <ClaimNow /> },
  ];

  // Insert custom sections after partners section (index 1)
  const sections = [...defaultSections];
  customSections.forEach((customSection, index) => {
    sections.splice(1 + index, 0, customSection);
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
    name: t('partners.d3.name'),
    displayName: t('partners.d3.displayName'),
    trialMonths: Number(t('partners.d3.trialMonths')) as 3 | 6 | 12,
    logo: D3Logo,
    hero: {
      title: t('hero.d3.title'),
      subtitle: t('hero.d3.subtitle'),
    },
    sections: buildSections(t, [
      { id: 'd3-features', component: <D3BentoGrids /> }
    ])
  },
  
  unstoppableDomains: {
    id: 'unstoppableDomains',
    name: t('partners.unstoppableDomains.name'),
    displayName: t('partners.unstoppableDomains.displayName'),
    trialMonths: Number(t('partners.unstoppableDomains.trialMonths')) as 3 | 6 | 12,
    logo: UnstoppableDomainsLogo,
    hero: {
      title: t('hero.unstoppableDomains.title'),
      subtitle: t('hero.unstoppableDomains.subtitle'),
    },
    sections: buildSections(t, [
      { id: 'ud-features', component: <UDTldFeatures /> }
    ])
  },
  
  polygon: {
    id: 'polygon',
    name: t('partners.polygon.name'),
    displayName: t('partners.polygon.displayName'),
    trialMonths: Number(t('partners.polygon.trialMonths')) as 3 | 6 | 12,
    logo: PolygonLogo,
    hero: {
      title: t('hero.polygon.title'),
      subtitle: t('hero.polygon.subtitle'),
    },
    sections: buildSections(t, []),
  },
  
  crossmint: {
    id: 'crossmint',
    name: t('partners.crossmint.name'),
    displayName: t('partners.crossmint.displayName'),
    trialMonths: Number(t('partners.crossmint.trialMonths')) as 3 | 6 | 12,
    logo: CrossmintLogo,
    hero: {
      title: t('hero.crossmint.title'),
      subtitle: t('hero.crossmint.subtitle'),
    },
    sections: buildSections(t, []),
  }
}); 