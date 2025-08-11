import SectionContainer from 'pages/public-pages/landings/_shared/components/SectionContainer/SectionContainer';
import React from 'react';
import FeaturedBlogs from '../assets/FeaturedBlogs';
import FeaturedBlogsCarousel from './FeaturedBlogsCarousel/FeaturedBlogsCarousel';

function PublicBlogsHeader() {
  return (
    <SectionContainer
      paddingBlockStart={{ base: '48px', lg: '80px' }}
      paddingBlockEnd={{ base: '36px', lg: '48px' }}
      sectionTitle={'THE SOURCE FOR FRESH IDEAS'}
      headingTitle="Tips, Trends & Inspiration"
      headingSubtitle="Stay up to date with the latest news and insights from our team."
      typographySvg={<FeaturedBlogs />}
    >
      <FeaturedBlogsCarousel />
    </SectionContainer>
  );
}

export default PublicBlogsHeader;
