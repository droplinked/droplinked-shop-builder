import { TemplateType, ButtonAction, CustomSection } from './types';
import React from 'react';
import PartnerVideoShowcase from '../components/partner-specific/PartnerVideoShowcase';

export interface PartnerTemplate {
  sections: string[];
  showPartners: boolean;
  showClaimNow: boolean;
  showProPlanCard: boolean;
  buttonAction: ButtonAction;
  requiresWalletVerification: boolean;
  allowCustomSections: boolean;
  defaultSections?: (videoUrl?: string) => CustomSection[];
}

export const PARTNER_TEMPLATES: Record<TemplateType, PartnerTemplate> = {
  TRIAL_TEMPLATE: {
    sections: ['partners', 'perk-list', 'modular-stack', 'join-community', 'claim-now'],
    showPartners: true,
    showClaimNow: true,
    showProPlanCard: true,
    buttonAction: 'claim',
    requiresWalletVerification: true,
    allowCustomSections: true
  },
  SHOWCASE_TEMPLATE: {
    sections: [ 'perk-list', 'video-showcase','modular-stack', 'join-community', 'signup-cta'],
    showPartners: false,
    showClaimNow: false,
    showProPlanCard: false,
    buttonAction: 'get-started',
    requiresWalletVerification: false,
    allowCustomSections: true,
    defaultSections: (videoUrl?: string) => [
      {
        id: 'video-showcase',
        component: React.createElement(PartnerVideoShowcase, { videoUrl: videoUrl || '' }),
        position: 1
      }
    ]
  }
};
