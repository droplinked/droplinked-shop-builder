// Generic layout component for all partner landing pages
import React, { PropsWithChildren } from 'react';
import { LazyLoad } from '../../_shared/components/LazyLoad';
import MaxWidthWrapper from '../../_shared/components/MaxWidthWrapper';
import { usePartnerLanding } from '../context/PartnerLandingContext';
import PartnerHero from './PartnerHero';

export function PartnerLayout({ children }: PropsWithChildren) {
  const { partnerConfig } = usePartnerLanding();

  return (
    <>
      <PartnerHero />
      <MaxWidthWrapper>
        {partnerConfig.sections.map((section) => (
          <LazyLoad key={section.id}>
            {section.component}
          </LazyLoad>
        ))}
      </MaxWidthWrapper>
      {children}
    </>
  );
} 