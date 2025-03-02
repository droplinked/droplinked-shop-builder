import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import CircleSeparatorList from 'components/redesign/circleSeparatorList/CircleSeparatorList';
import productPageModel from 'pages/affiliate/product/model';

import React from 'react';

function ProductOptions({ product }: { product: any }) {
  const sizes = productPageModel.getOptions({ skuIDs: product?.skuIDs, type: 'size' });
  const colors = productPageModel.getOptions({ skuIDs: product?.skuIDs, type: 'color' });
  const variants = productPageModel.getCustomVariants(product?.skuIDs);

  return (
    <>
      {/* Color Options */}
      {colors.length > 0 && (
        <OptionGroup title="Color">
          <Flex gap="16px" flexWrap="wrap">
            {colors.map((el, key) => (
              <Flex key={key} rounded="8px">
                <Box width="32px" height="32px" borderRadius={2} background={el?.value} />
              </Flex>
            ))}
          </Flex>
        </OptionGroup>
      )}

      {/* Size Options */}
      {sizes.length > 0 && (
        <OptionGroup title="Size">
          <CircleSeparatorList>
            {sizes.map((size, index) => (
              <AppTypography key={index} textAlign="center" color="white" fontSize="lg" fontWeight="medium">
                {size.caption}
              </AppTypography>
            ))}
          </CircleSeparatorList>
        </OptionGroup>
      )}

      {/* Variant Options */}
      {variants.length > 0 &&
        variants.map((variant_group, key) => (
          <OptionGroup key={key} title={variant_group.name}>
            <CircleSeparatorList>
              {variant_group.values.map((value, index) => (
                <AppTypography key={index} textAlign="center" color="white" fontSize="lg" fontWeight="medium">
                  {value.caption}
                </AppTypography>
              ))}
            </CircleSeparatorList>
          </OptionGroup>
        ))}
    </>
  );
}

/**
 * Reusable option group component with title.
 */
const OptionGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box>
    <AppTypography fontSize="16px" fontWeight="500" color={'#B1B1B1'} mb={4}>
      {title}
    </AppTypography>
    {children}
  </Box>
);

export default ProductOptions;
