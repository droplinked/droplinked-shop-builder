import { Flex, Image } from '@chakra-ui/react';
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading';
import { LazyLoad } from 'pages/public-pages/landings/_shared/components/LazyLoad';
import MaxWidthWrapper from 'pages/public-pages/landings/_shared/components/MaxWidthWrapper';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPublicBlogBySlugService } from 'services/blog/services';
import BlogsCarousel from '../../components/common/BlogsCarousel/BlogsCarousel';
import BlogContent from './BlogContent';
import { extractTocItems } from './BlogContentRenderer';
import BlogHeader from './BlogHeader';
import BlogSidebar from './BlogSidebar/BlogSidebar';

function BlogDetailPage() {
  const { slug } = useParams();

  // Use useQuery directly for fetching the specific blog
  const { data, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getPublicBlogBySlugService(slug),
    enabled: !!slug
  });

  const blog = data?.data;

  // Extract TOC items from blog content
  const tocItems = blog ? extractTocItems(blog) : [];

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <MaxWidthWrapper>
      <LazyLoad>
          {/* Header Section */}
          <BlogHeader
            title={blog.title}
            writer={blog.writer}
            readTime={blog.readTime}
          />

          {/* Featured Image */}
          <Image
            src={blog.image}
            width="100%"
            height="384px"
            borderRadius="2xl"
            objectFit="cover"
           
          />
  
          {/* Main Content */}
          <Flex
            direction={{ base: 'column', xl: 'row' }}
            justify="flex-start"
            align="flex-start"
            gap={9}
            width="100%"
            paddingBlockStart={{ base: '36px', lg: '48px' }}
            paddingBlockEnd={{ base: '48px', lg: '80px' }}
          >
            {/* Blog Content */}
            <BlogContent blog={blog} />

            {/* Sidebar */}
            <BlogSidebar
              category={blog.category}
              createdAt={blog.createdAt}
              tags={blog.tags}
              tocItems={tocItems}
            />
          </Flex>

          <BlogsCarousel />

      </LazyLoad>
    </MaxWidthWrapper>
  );
}

export default BlogDetailPage;
