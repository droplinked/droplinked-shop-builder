import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import AffiliateProductCard from './AffiliateProductCard/AffiliateProductCard';
import AffiliateProductCardPlaceholder from './AffiliateProductCardPlaceholder';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

/**
 * Renders a list of products in a grid with infinite scrolling.
 *
 * @param {Object} props
 * @param {Array}  props.data?.pages - Array of product pages from useInfiniteQuery
 * @param {Function} props.fetchNextPage - Function to fetch the next page (from useInfiniteQuery)
 * @param {boolean} props.hasNextPage - Indicator if more pages are available
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isError - Error state
 *
 */

const ProductsGridRenderer = ({ isPublic ,data, fetchNextPage, hasNextPage, isLoading, isError }) => {
  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="16px" width="full">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <AffiliateProductCardPlaceholder key={index} />
          ))}
      </SimpleGrid>
    );
  }

  if (isError) {
    return <Text>Error loading products</Text>;
  }

  const products = data?.pages?.flatMap((page) => page?.data) ?? data.products ?? [];

  return (
    <Box color="white" width="full">
      <InfiniteScroll
        dataLength={products.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="16px" width="full">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <AffiliateProductCardPlaceholder key={index} />
              ))}
          </SimpleGrid>
        }
      >
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="16px" width="full">
          {products.map((product, index) => (
            <AffiliateProductCard key={index}  isPublic={isPublic} product={product} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default ProductsGridRenderer;
