import SectionContainer from 'pages/public-pages/landings/_shared/components/SectionContainer/SectionContainer';
import React from 'react';
import BlogPosts from '../../assets/BlogPosts';
import BlogGrid from '../../components/common/‌BlogGrid/BlogGrid';

interface CategoryBlogSectionProps {
  blogs: any[];
  isLoading: boolean;
}

const CategoryBlogSection: React.FC<CategoryBlogSectionProps> = ({ blogs, isLoading }) => {
  return (
    <SectionContainer 
      typographySvg={<BlogPosts />} 
      paddingBlock={0} 
      paddingBlockEnd={{base:"80px", lg:"128px"}}
    >
      <BlogGrid blogs={blogs} isLoading={isLoading} showTitle={false} />
    </SectionContainer>
  );
};

export default CategoryBlogSection;
