import { Box } from '@chakra-ui/react';
import React from 'react';
import { ProductGrid } from './common/ProductGrid';
import { SectionHeader } from './common/SectionHeader';

/**
 * NewProductsSection Component
 * Displays a grid of newly added products.
 *
 * @param {boolean} isLoading - Indicates if products data is loading.
 * @param {Array} products - List of new products.
 */
export const NewProductsSection = ({ isLoading, products }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
      {/* Section Header with title & navigation link */}
      <SectionHeader title="New Products" linkText="See all" linkTo="/analytics/affiliate/products" />
      {/* Products Grid - Displays either placeholders or actual products */}
      <ProductGrid isLoading={isLoading} products={products?.data?.data} />
      
    </Box>
  );
};
