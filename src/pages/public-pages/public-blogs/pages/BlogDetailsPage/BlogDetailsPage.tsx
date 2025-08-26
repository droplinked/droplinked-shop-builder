import { Flex, Image } from '@chakra-ui/react';
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading';
import { LazyLoad } from 'pages/public-pages/landings/_shared/components/LazyLoad';
import MaxWidthWrapper from 'pages/public-pages/landings/_shared/components/MaxWidthWrapper';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { getPublicBlogBySlugServerSide } from 'services/blog/server-services';
import BlogsCarousel from '../../components/common/BlogsCarousel/BlogsCarousel';
import BlogContent from './BlogContent';
import { extractTocItems } from './BlogContentRenderer';
import BlogHeader from './BlogHeader';
import BlogSidebar from './BlogSidebar/BlogSidebar';

export async function loader({ params }: { params: { slug: string } }) {
  const initialBlog = await getPublicBlogBySlugServerSide(params.slug);
  return {
    initialBlog: initialBlog?.data || null,
    slug: params.slug,
  };
}

function BlogDetailPage() {
  const navigate = useNavigate();
  const [activeTocItemId, setActiveTocItemId] = useState<string>('');
  const { initialBlog } = useLoaderData<typeof loader>();

  const blog = initialBlog;

  // Extract TOC items from blog content
  const tocItems = blog ? extractTocItems(blog) : [];

  if (typeof window === "undefined") return null;

  // Scroll tracking logic for table of contents
  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const headingElements = tocItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element);

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Find the heading that's currently in view
      let activeHeading = '';

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        if (heading.element) {
          const rect = heading.element.getBoundingClientRect();
          if (rect.top <= 100) { // Consider heading active when it's near the top
            activeHeading = heading.id;
            break;
          }
        }
      }

      // If no heading is found, check if we're at the top
      if (!activeHeading && scrollPosition < 200) {
        activeHeading = headingElements[0]?.id || '';
      }

      if (activeHeading !== activeTocItemId) {
        setActiveTocItemId(activeHeading);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems, activeTocItemId]);

  const handleTocItemClick = (itemId: string) => {
    const element = document.getElementById(itemId);
    if (element) {
      const offsetTop = element.offsetTop - 120; // Offset for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveTocItemId(itemId);
    }
  };

  // If no blog data is available, navigate to blogs page
  if (!blog) {
    navigate('/blogs');
    return <FullScreenLoading />;
  }

  return (
    <MaxWidthWrapper paddingBlockStart={{ base: "48px", lg: "80px" }} paddingBlockEnd={{ base: "80px", lg: "128px" }} dir="ltr">
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
            activeTocItemId={activeTocItemId}
            onTocItemClick={handleTocItemClick}
          />
        </Flex>

        <BlogsCarousel />

      </LazyLoad>
    </MaxWidthWrapper>
  );
}

export default BlogDetailPage;
