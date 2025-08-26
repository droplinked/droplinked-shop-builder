// Generic layout component for all partner landing pages
import React, { PropsWithChildren } from 'react';
import { LazyLoad } from '../../_shared/components/LazyLoad';
import MaxWidthWrapper from '../../_shared/components/MaxWidthWrapper';
import { usePartnerLanding } from '../context/PartnerLandingContext';
import { PARTNER_TEMPLATES } from '../config/templates';
import PartnerHero from './PartnerHero';
import MarqueeSection from '../../_shared/components/marquee-wrapper/MarqueeSection';
import PerkList from '../components/PerkList';
import ModularStack from '../components/ModularStack';
import JoinCommunity from '../../_shared/components/JoinCommunity';
import ClaimNow from '../components/ClaimNow';
import SignUpCta from '../../_shared/components/SignUpCta';

export function PartnerLayout({ children }: PropsWithChildren) {
  const { partnerConfig, template } = usePartnerLanding();
  const templateConfig = PARTNER_TEMPLATES[template];

  // Build sections based on template
  const buildSections = () => {
    const sections: React.ReactElement[] = [];
    
    templateConfig.sections.forEach((sectionId) => {
      switch (sectionId) {
        case 'partners':
          if (templateConfig.showPartners) {
            sections.push(<MarqueeSection key="partners" />);
          }
          break;
        case 'perk-list':
          sections.push(<PerkList key="perk-list" />);
          break;
        case 'modular-stack':
          sections.push(<ModularStack key="modular-stack" />);
          break;
        case 'join-community':
          sections.push(<JoinCommunity key="join-community" />);
          break;
        case 'claim-now':
          if (templateConfig.showClaimNow) {
            sections.push(<ClaimNow key="claim-now" />);
          }
          break;
        case 'signup-cta':
          // Automatically add SignUpCta for SHOWCASE_TEMPLATE
          sections.push(<SignUpCta key="signup-cta" />);
          break;
      }
    });

    // Insert custom sections at specified positions
    if (templateConfig.allowCustomSections) {
      // First, add template default sections if they exist
      if (templateConfig.defaultSections && partnerConfig.showcaseVideoUrl) {
        const defaultSections = templateConfig.defaultSections(partnerConfig.showcaseVideoUrl);
        defaultSections.forEach(defaultSection => {
          const position = defaultSection.position ?? 1;
          sections.splice(position, 0, defaultSection.component);
        });
      }
      
      // Then add partner-specific custom sections
      if (partnerConfig.customSections) {
        partnerConfig.customSections.forEach(customSection => {
          const position = customSection.position ?? 1;
          sections.splice(position, 0, customSection.component);
        });
      }
    }

    return sections;
  };

  const sections = buildSections();

  return (
    <>
      <PartnerHero />
      <MaxWidthWrapper>
        {sections.map((section, index) => (
          <LazyLoad key={`section-${index}`}>
            {section}
          </LazyLoad>
        ))}
      </MaxWidthWrapper>
      {children}
    </>
  );
} 