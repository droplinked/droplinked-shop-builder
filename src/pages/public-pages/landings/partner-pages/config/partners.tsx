import BaseLogo from 'assets/brand-identity/Base';
import CrossmintLogo from 'assets/brand-identity/Crossmint';
import D3Logo from 'assets/brand-identity/D3';
import GaiaLogo from 'assets/brand-identity/Gaia';
import PolygonLogo from 'assets/brand-identity/Polygon';
import UnstoppableDomainsLogo from 'assets/brand-identity/UnstoppableDomains';
import { TFunction } from 'i18next';
import D3BentoGrids from 'pages/public-pages/landings/partner-pages/components/partner-specific/D3BentoGrids';
import UDTldFeatures from 'pages/public-pages/landings/partner-pages/components/partner-specific/UDTldFeatures';
import React from 'react';
import { PartnerConfig } from './types';

/**
 * PARTNER LANDING PAGE CONFIGURATION
 * 
 * This file configures partner-specific landing pages using templates.
 * 
 * TEMPLATES:
 * - TRIAL_TEMPLATE: Regular partners with claim functionality (d3, ud, polygon, crossmint)
 * - SHOWCASE_TEMPLATE: Creator-focused partners without claim (base, gaia)
 */

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
    template: 'TRIAL_TEMPLATE',
    hero: {
      title: t('PartnerHero.d3.title'),
      subtitle: t('PartnerHero.d3.subtitle'),
    },
    customSections: [ { id: 'd3-features', component: <D3BentoGrids /> }
    ]
  },

  unstoppableDomains: {
    id: 'unstoppableDomains',
    name: t('PartnerConfig.unstoppableDomains.name'),
    displayName: t('PartnerConfig.unstoppableDomains.displayName'),
    trialMonths: Number(t('PartnerConfig.unstoppableDomains.trialMonths')),
    logo: UnstoppableDomainsLogo,
    template: 'TRIAL_TEMPLATE',
    hero: {
      title: t('PartnerHero.unstoppableDomains.title'),
      subtitle: t('PartnerHero.unstoppableDomains.subtitle'),
    },
    customSections: [{ id: 'ud-features', component: <UDTldFeatures /> }]
  },

  polygon: {
    id: 'polygon',
    name: t('PartnerConfig.polygon.name'),
    displayName: t('PartnerConfig.polygon.displayName'),
    trialMonths: Number(t('PartnerConfig.polygon.trialMonths')),
    logo: PolygonLogo,
    template: 'TRIAL_TEMPLATE',
    hero: {
      title: t('PartnerHero.polygon.title'),
      subtitle: t('PartnerHero.polygon.subtitle'),
    }
  },

  crossmint: {
    id: 'crossmint',
    name: t('PartnerConfig.crossmint.name'),
    displayName: t('PartnerConfig.crossmint.displayName'),
    trialMonths: Number(t('PartnerConfig.crossmint.trialMonths')),
    logo: CrossmintLogo,
    template: 'TRIAL_TEMPLATE',
    hero: {
      title: t('PartnerHero.crossmint.title'),
      subtitle: t('PartnerHero.crossmint.subtitle'),
    }
  },

  base: {
    id: 'base',
    name: t('PartnerConfig.base.name'),
    displayName: t('PartnerConfig.base.displayName'),
    trialMonths: Number(t('PartnerConfig.base.trialMonths')),
    logo: BaseLogo,
    template: 'SHOWCASE_TEMPLATE',
    hero: {
      title: t('PartnerHero.base.title'),
      subtitle: t('PartnerHero.base.subtitle'),
    },
    showcaseVideoUrl: "https://www.youtube.com/embed/dr4tbUcjrDQ?si=6OsH0wNOlEPWMhbx"
  },
  
  gaia: {
    id: 'gaia',
    name: t('PartnerConfig.gaia.name'),
    displayName: t('PartnerConfig.gaia.displayName'),
    trialMonths: Number(t('PartnerConfig.gaia.trialMonths')),
    logo: GaiaLogo,
    template: 'SHOWCASE_TEMPLATE',
    hero: {
      title: t('PartnerHero.gaia.title'),
      subtitle: t('PartnerHero.gaia.subtitle'),
    },
    showcaseVideoUrl: "https://www.youtube.com/embed/JpvG9m4M3yg?si=iYefusskD5xru87_"
  }
}); 