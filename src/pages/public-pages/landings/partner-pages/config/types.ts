// TypeScript types for partner landing page configurations
export interface PartnerConfig {
  id: PartnerId;
  name: string;
  displayName: string;
  trialMonths: number;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  template: TemplateType;
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
  };
  customSections?: CustomSection[];
  // Partner-specific perk list customization
  perkListSectionTitle?: string;
  perkListHeadingTitle?: string;
  // For SHOWCASE_TEMPLATE: video URL for the default video showcase section
  showcaseVideoUrl?: string;
}

export interface CustomSection {
  id: string;
  component: React.ReactElement;
  position?: number; // Simple: just specify the position index
}

export interface Section {
  id: string;
  component: React.ReactElement;
  position?: number; // Simple: just specify the position index
}

export type PartnerId = 'd3' | 'unstoppableDomains' | 'polygon' | 'crossmint' | 'base' | 'gaia';
export type TemplateType = 'TRIAL_TEMPLATE' | 'SHOWCASE_TEMPLATE';
export type ButtonAction = 'claim' | 'get-started';
export type SectionId = 'partners' | 'set-of-perks' | 'modular-stack' | 'join-community' | 'claim-now' | 'd3-features' | 'ud-features'; 