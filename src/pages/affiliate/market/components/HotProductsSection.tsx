import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { dates_constant } from '../constants/date.constants';
import { ProductGrid } from './common/ProductGrid';

/**
 * HotProductsSection Component
 * Displays a list of trending products with a date filter.
 *
 * @param {boolean} isLoading - Indicates if products are still loading.
 * @param {Array} products - The list of hot products.
 * @param {Object} date - The currently selected date filter.
 * @param {Function} setDate - Function to update the selected date.
 */
export const HotProductsSection = ({ isLoading, products, date, setDate }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
      {/* Header Section: Title & Date Filter */}
      <Box display="flex" justifyContent="space-between" alignItems="center" width="full">
        <AppTypography fontSize="20px" fontWeight="700" textColor={'white'}>
          Hot Products
        </AppTypography>

        {/* Date Range Filters */}
        <Flex gap="12px">
          {dates_constant.map((date_constant) => (
            <Box
              key={date_constant.value}
              cursor="pointer"
              onClick={() => setDate(date_constant)}
              backgroundColor={date_constant.value === date.value ? '#2BCFA1' : 'neutral.gray.800'}
              padding="6px 16px"
              borderRadius="100px"
            >
              <AppTypography fontSize="14px" fontWeight="500" color={date_constant.value === date.value ? '#000' : 'text.subtext.placeholder.dark'}>
                {date_constant.label}
              </AppTypography>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Product Grid - Displays either placeholders or actual products */}
      <ProductGrid isLoading={isLoading} products={products?.data?.data || []} />
    </Box>
  );
};
