import { Box, SimpleGrid } from '@chakra-ui/react';
import AffiliateProductCard from 'pages/affiliate/components/AffiliateProductCard/AffiliateProductCard';
import AffiliateProductCardPlaceholder from 'pages/affiliate/components/AffiliateProductCardPlaceholder';

import React from 'react';

export const ProductGrid = ({ isLoading, products }) => (
  // Responsive grid layout for displaying products
  <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4, '2xl': 4 }} spacing="24px" width="full">
    {isLoading
      ? // Show placeholder cards while data is loading
        Array(4)
          .fill(0)
          .map((_, index) => (
            <Box
              key={`skeleton-${index}`}
              display={{
                base: index < 1 ? 'block' : 'none',
                sm: index < 1 ? 'block' : 'none',
                md: index < 2 ? 'block' : 'none',
                lg: index < 3 ? 'block' : 'none',
                xl: index < 4 ? 'block' : 'none',
                '2xl': index < 4 ? 'block' : 'none'
              }}
            >
              <AffiliateProductCardPlaceholder />
            </Box>
          ))
      : // Render actual product cards once data is loaded
        products?.map((product, index) => (
          <Box
            key={product.slug}
            display={{
              base: index < 1 ? 'block' : 'none',
              sm: index < 1 ? 'block' : 'none',
              md: index < 2 ? 'block' : 'none',
              lg: index < 3 ? 'block' : 'none',
              xl: index < 4 ? 'block' : 'none',
              '2xl': index < 4 ? 'block' : 'none'
            }}
          >
            <AffiliateProductCard product={product} />
          </Box>
        ))}
  </SimpleGrid>
);
