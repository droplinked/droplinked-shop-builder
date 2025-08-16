// D3-specific features section with bento grid layout
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer';
import HowItWorks from '../../assets/HowItWorks';
import MobileAnimationFrame from 'pages/public-pages/landings/home/components/go-live-section/MobileAnimationFrame';
import DesktopAnimationFrame from 'pages/public-pages/landings/home/components/go-live-section/DesktopAnimationFrame';
import { Box, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';

export default function BaseGetStartedSection() {
  const { t } = useLocaleResources('public-pages/landings/partner-pages');

  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');

  // YouTube video component
  const YouTubeVideo = () => {
    const height = useBreakpointValue({
      base: '185px',
      md: '280px',
      lg: '350px',
      xl: '624px'
    });
    return (
      <iframe
        width="100%"
        height={height}
        src="https://www.youtube.com/embed/dr4tbUcjrDQ?si=6OsH0wNOlEPWMhbx"
        title="Droplinked Partner Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ borderRadius: '12px', maxHeight: '624px' }}
      />
    );
  };
  return (
    <SectionContainer
      icon="sparkle"
      sectionTitle={t('BaseGetStartedSection.sectionTitle')}
      headingTitle={t('BaseGetStartedSection.headingTitle')}
      headingSubtitle={t('BaseGetStartedSection.headingSubtitle')}
      typographySvg={<HowItWorks />}
    >
      <Box alignItems="stretch" width="100%">
        {isSmallerThan768 && (
          <MobileAnimationFrame
            LottieView={<YouTubeVideo />}
            completedSteps={[]}
            isTransitioning={false}
          />
        )}

        {!isSmallerThan768 && (
          <DesktopAnimationFrame
            LottieView={<YouTubeVideo />}
            completedSteps={[]}
            isTransitioning={false}
            width="100%"
          />
        )}
      </Box>
    </SectionContainer>
  );
}
