// D3-specific features section with bento grid layout
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer';
import HowItWorks from '../../assets/HowItWorks';

export default function BaseGetStartedSection() {
  const { t } = useLocaleResources('public-pages/landings/partner-pages');

  // YouTube video component
  const YouTubeVideo = () => (
    <iframe
      width="100%"
      height="624px"
      src="https://www.youtube.com/embed/dr4tbUcjrDQ?si=6OsH0wNOlEPWMhbx"
      title="Droplinked Partner Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ borderRadius: '12px' }}
    />
  );

  return (
    <SectionContainer
      icon="sparkle"
      sectionTitle={t('BaseGetStartedSection.sectionTitle')}
      headingTitle={t('BaseGetStartedSection.headingTitle')}
      headingSubtitle={t('BaseGetStartedSection.headingSubtitle')}
      typographySvg={<HowItWorks />}
      width="100%"
      alignItems="stretch"
    >
      <YouTubeVideo />
    </SectionContainer>
  );
}
