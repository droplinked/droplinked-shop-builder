import { Flex, Grid } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IBlogListItem } from '../../../types/blog.types';
import BlogCard from './BlogCard';
import AppButton from 'components/redesign/button/AppButton';
import SectionTitle from '../SectionTitle';

interface BlogGridProps {
  blogs: IBlogListItem[];
  isLoading: boolean;
  showTitle?: boolean;
}

function BlogGrid({ blogs, isLoading, showTitle = true }: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(9);

  const handleViewMore = () => setVisibleCount((prev) => prev + 9);

  const hasMoreToShow = visibleCount < blogs.length;

  const VisibleBlogsGrid = ({ items }: { items: IBlogListItem[] }) => (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)'
      }}
      gap={6}
    >
      {items.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </Grid>
  );

  const LoadMoreButton = () =>
    hasMoreToShow ? (
      <Flex justifyContent="center" alignItems="center">
        <AppButton
          variant="secondary"
          size="lg"
          mt={12}
          onClick={handleViewMore}
          isLoading={isLoading}
        >
          View More
        </AppButton>
      </Flex>
    ) : null;

  return (
    <>
      {showTitle && (
        <SectionTitle>
          Learn More
        </SectionTitle>
      )}
      <VisibleBlogsGrid items={blogs.slice(0, visibleCount)} />
      <LoadMoreButton />
    </>
  );
}

export default BlogGrid;
