import { Box, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { typesProperties } from 'data/types';
import React from 'react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';

interface ProductDetailsProps {
  product: {
    skuIDs: Array<{
      options: Array<{
        variantID: string;
        caption: string;
        value: string;
      }>;
      sold_units: number;
      quantity: number;
      price: number;
    }>;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const getVariantOption = (sku, variantIndex) => {
    return sku.options.find(
      (option) => option.variantID === typesProperties[variantIndex]?._id
    );
  };

  const renderColorOption = (colorOption) => {
    if (!colorOption?.caption) return null;

    return (
      <Flex align="center" gap="2">
        <Flex
          align="center"
          justify="center"
          rounded="sm"
          bg={colorOption.value}
          boxSize="4"
        />
        <Text fontSize="sm" color="white">
          {colorOption.caption}
        </Text>
      </Flex>
    );
  };

  const renderSizeOption = (sizeOption) => {
    if (!sizeOption?.caption) return null;

    return (
      <Flex align="center" gap="2">
        <Text fontSize="sm" color="white">
          {sizeOption.caption}
        </Text>
      </Flex>
    );
  };

  const renderSoldQuantity = (sku) => (
    <HStack spacing="0.5">
      <Text fontSize="sm" color="white">
        {sku.sold_units || '0'} /
      </Text>
      <Text fontSize="sm" color="text.subtext.placeholder.dark">
        {sku.quantity || '0'}
      </Text>
    </HStack>
  );

  const renderSkuItem = (sku, index) => {
    const colorOption = getVariantOption(sku, 0);
    const sizeOption = getVariantOption(sku, 1);
    const isLastItem = index === product.skuIDs.length - 1;

    return (
      <VStack key={index} w="full" spacing="2.5" align="start">
        <HStack w="full" p="4" justify="space-between" align="center">
          {/* Variant Options */}
          <DotSeparatedList>
            {renderColorOption(colorOption)}
            {renderSizeOption(sizeOption)}
          </DotSeparatedList>

          {/* Sold and Quantity */}
          {renderSoldQuantity(sku)}

          {/* Price */}
          <HStack spacing="1">
            <FormattedPrice
              price={sku.price}
              abbreviationProps={{ color: 'text.subtext.placeholder.dark' }}
              fontSize="sm"
              color="white"
            />
          </HStack>
        </HStack>

        {!isLastItem && <Divider borderColor="#282828" />}
      </VStack>
    );
  };

  return (
    <Box
      w="full"
      borderWidth="1px"
      borderColor="#282828"
      borderRadius="lg"
      overflow="hidden"
    >
      {product?.skuIDs?.map(renderSkuItem)}
    </Box>
  );
};

export default ProductDetails;
