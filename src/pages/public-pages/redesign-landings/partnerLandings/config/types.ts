// TypeScript types for partner landing page configurations
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

export interface Section {
  id: string;
  component: React.ReactElement;
}

export type PartnerId = 'd3' | 'unstoppableDomains' | 'polygon' | 'crossmint';
export type SectionId = 'partners' | 'set-of-perks' | 'modular-stack' | 'join-community' | 'claim-now' | 'd3-features' | 'ud-features'; 