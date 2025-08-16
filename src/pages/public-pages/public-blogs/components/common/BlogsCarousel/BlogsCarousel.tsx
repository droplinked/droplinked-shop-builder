import React, { useCallback, useState, useEffect } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import useBlogs from '../../../hooks/useBlogs';
import DiscoverCard from './BlogCard';
import SliderControls from '../SliderControls';
import SectionTitle from '../SectionTitle';

interface BlogItem {
  _id: string;
  category: string;
  title: string;
  writer: string;
  createdAt: string;
  image: string;
}

interface BlogsCarouselProps {
  visibleItems?: number;
  showControls?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onItemClick?: (item: BlogItem) => void;
}

const BlogsCarousel: React.FC<BlogsCarouselProps> = ({
  visibleItems, // if provided, overrides responsive value
  showControls = true,  
  autoPlay = false,
  autoPlayInterval = 3000,
  onItemClick
}) => {
  const { getLatestBlogs, isLoading } = useBlogs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation('public-pages/public-blogs');

  const latest = getLatestBlogs(6);
  const items = latest;

  // Responsive slides to show: base=1, lg=2, xl=3
  const responsiveVisible = useBreakpointValue({ base: 1, lg: 2, xl: 3 }) ?? 1;
  const slidesToShow = visibleItems ?? responsiveVisible;

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    const maxIndex = Math.max(0, items.length - slidesToShow);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [items.length, slidesToShow]);

  // Clamp index when items or slidesToShow change
  useEffect(() => {
    const maxIndex = Math.max(0, items.length - slidesToShow);
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [items.length, slidesToShow]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= slidesToShow) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = items.length - slidesToShow;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, slidesToShow]);

  if (isLoading || items.length === 0) return null;

  const visibleItemsList = items.slice(
    currentIndex,
    currentIndex + slidesToShow
  );

  return (
    <Box
      w="100%"
      display="inline-flex"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={6}
    >
      <Flex w="full" justify="space-between" align="center">
        <SectionTitle>{t('BlogsCarousel.sectionTitle')}</SectionTitle>

        {showControls && items.length > slidesToShow && (
          <SliderControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentIndex={currentIndex}
            totalItems={items.length}
            visibleItems={slidesToShow}
          />
        )}
      </Flex>

      <Flex w="100%" gap={6} overflow="hidden">
        {visibleItemsList.map((item) => (
          <DiscoverCard
            slug={item.slug}
            key={item._id}
            category={item.category}
            title={item.title}
            writer={item.writer}
            createdAt={item.createdAt}
            image={item.image}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default BlogsCarousel;
