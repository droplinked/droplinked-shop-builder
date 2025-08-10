import { Box, Flex } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/public-pages/blogs/ar.json';
import enLocale from 'locales/public-pages/blogs/en.json';
import React from 'react';
import { LazyLoad } from '../landings/_shared/components/LazyLoad';
import MaxWidthWrapper from '../landings/_shared/components/MaxWidthWrapper';
import SignUpCta from '../landings/_shared/components/SignUpCta';
import BackgroundImage from './components/BackgroundImage';
import BlogGrid from './components/BlogGrid';
import BlogsCarousel from './components/common/BlogsCarousel/BlogsCarousel';
import Categories from './components/Categories';
import LatestBlogsGrid from './components/LatestBlogsGrid/LatestBlogsGrid';
import PublicBlogsHeader from './components/PublicBlogsHeader';
import useBlogs from './hooks/useBlogs';

function BlogPage() {
  useLocaleResources('public-pages/blog', { en: enLocale, ar: arLocale });
  const { blogs, isLoading } = useBlogs();

  const sections = [
    { id: 'blog-header', component: <PublicBlogsHeader /> },
    { id: 'trending-grid', component: <LatestBlogsGrid /> },
    { id: 'discover-slider', component: <BlogsCarousel /> },
    { id: 'blog-grid', component: <BlogGrid blogs={blogs} isLoading={isLoading} /> },
    { id: 'categories', component: <Categories /> },
    { id: 'sign-up-cta', component: <SignUpCta /> }
  ];

  return (
    <>
      <BackgroundImage height="100vh" zIndex={1} />

      {/* Content container */}
      <Box position="relative" zIndex={2}>
        <MaxWidthWrapper>
          <Flex direction="column" gap={{ base: '80px', lg: '128px' }}> 
          {sections.map((section) => (
            <LazyLoad key={section.id}>{section.component}</LazyLoad>
          ))}
          </Flex>
        </MaxWidthWrapper>
      </Box>
    </>
  );
}

export default BlogPage;
