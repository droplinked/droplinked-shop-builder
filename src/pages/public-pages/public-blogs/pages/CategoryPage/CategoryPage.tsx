import { Box } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LazyLoad } from '../../../landings/_shared/components/LazyLoad';
import MaxWidthWrapper from '../../../landings/_shared/components/MaxWidthWrapper';
import BackgroundImage from '../../components/common/BackgroundImage';
import CategoryBlogSection from './CategoryBlogSection';
import CategoryHeader from './CategoryHeader';
import useBlogs from '../../hooks/useBlogs';

function CategoryPage() {
  const { category } = useParams();
  const { getBlogsByCategory, isLoading } = useBlogs();

  const categoryBlogs = getBlogsByCategory(category || 'General');

  return (
    <>
      <BackgroundImage />
      {/* Content container */}
      <Box position="relative" zIndex={1}>
        <MaxWidthWrapper>
          <LazyLoad>
            <CategoryHeader category={category} />
            <CategoryBlogSection blogs={categoryBlogs} isLoading={isLoading} />
          </LazyLoad>
        </MaxWidthWrapper>
      </Box>
    </>
  );
}

export default CategoryPage;
