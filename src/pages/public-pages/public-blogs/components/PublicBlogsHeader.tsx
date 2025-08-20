import SectionContainer from 'pages/public-pages/landings/_shared/components/SectionContainer/SectionContainer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FeaturedBlogs from '../assets/FeaturedBlogs';
import FeaturedBlogsCarousel from './FeaturedBlogsCarousel/FeaturedBlogsCarousel';

function PublicBlogsHeader() {
  const { t } = useTranslation('public-pages/public-blogs');

  return (
    <SectionContainer
      paddingBlockStart={{ base: '48px', lg: '80px' }}
      paddingBlockEnd={{ base: '36px', lg: '48px' }}
      sectionTitle={t('PublicBlogsHeader.sectionTitle')}
      headingTitle={t('PublicBlogsHeader.headingTitle')}
      headingSubtitle={t('PublicBlogsHeader.headingSubtitle')}
      typographySvg={<FeaturedBlogs />}
    >
      <FeaturedBlogsCarousel />
    </SectionContainer>
  );
}

export default PublicBlogsHeader;
