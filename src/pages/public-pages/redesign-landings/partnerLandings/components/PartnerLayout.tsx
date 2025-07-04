// Generic layout component for all partner landing pages
import React from 'react';
import { LazyLoad } from '../../_shared/components/LazyLoad';
import MaxWidthWrapper from '../../_shared/components/MaxWidthWrapper';
import { PartnerConfig } from '../config/types';
import PartnerHero from './hero/PartnerHero';

interface PartnerLayoutProps {
  config: PartnerConfig;
  children?: React.ReactNode;
}

export function PartnerLayout({ config, children }: PartnerLayoutProps) {
  return (
    <>
      <PartnerHero
        partnerId={config.id}
        title={config.hero.title}
        subtitle={config.hero.subtitle}
        partnerLogo={config.logo}
      />
      <MaxWidthWrapper>
        {config.sections.map((section) => (
          <LazyLoad key={section.id}>
            {section.component}
          </LazyLoad>
        ))}
      </MaxWidthWrapper>
      {children}
    </>
  );
} 