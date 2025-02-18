import { Box } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

function ProductTitle({ product }) {
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="flex-start" alignSelf="stretch">
    <Box flex="1 1 0" display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
      {/* Product Collection Title */}
      <AppTypography fontSize="base" fontWeight="normal" lineHeight="normal" color={'white'}>
        {product?.productCollectionID?.title}
      </AppTypography>

      {/* Product Title */}
      <AppTypography fontSize="28px" fontWeight="medium" lineHeight="40px" alignSelf="stretch" color={'white'}>
        {product?.title}
      </AppTypography>
    </Box>

    {/* Icon Container (commented out) */}
    {/* <IconContainer icon={<AppIcons.Share />} /> */}
  </Box>
  );
}

export default ProductTitle;
