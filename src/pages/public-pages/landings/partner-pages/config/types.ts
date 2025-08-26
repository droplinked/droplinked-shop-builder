// TypeScript types for partner landing page configurations
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
  // Partner-specific perk list customization
  perkListSectionTitle?: string;
  perkListHeadingTitle?: string;
}

export interface Section {
  id: string;
  component: React.ReactElement;
  position?: number; // Simple: just specify the position index
}

export type PartnerId = 'd3' | 'unstoppableDomains' | 'polygon' | 'crossmint' | 'base';
export type SectionId = 'partners' | 'set-of-perks' | 'modular-stack' | 'join-community' | 'claim-now' | 'd3-features' | 'ud-features'; 