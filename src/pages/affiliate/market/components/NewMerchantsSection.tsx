import { Box, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import AffiliateProductCardPlaceholder from 'pages/affiliate/components/AffiliateProductCardPlaceholder';
import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from './common/SectionHeader';

/**
 * NewMerchantsSection Component
 * Displays a grid of newly joined merchants.
 *
 * @param {boolean} isLoading - Indicates if merchants data is loading.
 * @param {Array} shops - List of new merchants.
 */
export const NewMerchantsSection = ({ isLoading, shops }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
      {/* Section Header with title & navigation link */}
      <SectionHeader title="New Merchants" linkText="See all" linkTo="/analytics/affiliate/stores" />

      <SimpleGrid columns={{ base: 3, sm: 3, md: 3, lg: 4, xl: 5, '2xl': 5 }} spacing={'24px'} width="full">
        {isLoading ? (
          // Show placeholders while loading
          Array.from({ length: 5 }, (_, index) => (
            <Box key={index} display="flex" alignItems="center" gap="16px">
              <SkeletonCircle size="56px" />
              <Box>
                <Skeleton height="16px" width="120px" mb="4px" />
                <Skeleton height="14px" width="80px" />
              </Box>
            </Box>
          ))
        ) : (
          shops?.data?.data?.map((shop, index) => (
            <Box
              key={shop._id}
              display={{
                base: index < 3 ? 'block' : 'none',
                sm: index < 3 ? 'block' : 'none',
                md: index < 3 ? 'block' : 'none',
                lg: index < 4 ? 'block' : 'none',
                xl: index < 5 ? 'block' : 'none',
                '2xl': index < 5 ? 'block' : 'none'
              }}
            >
              <Link to={`/analytics/affiliate/stores/${shop?._id}`} style={{ display: 'flex', flex: '1 0 0', alignItems: 'center', cursor: 'pointer', gap: '16px', borderRadius: '8px' }}>
                <AppImage rounded="full" width={'56px'} height={'56px'} src={shop?.logo} />
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                  <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="24px">
                    {shop?.name}
                  </AppTypography>
                  <AppTypography color="#F5F7FA99" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                    Merchant
                  </AppTypography>
                </Box>
              </Link>
            </Box>
          ))
        )}
      </SimpleGrid>
    </Box>
  );
};
