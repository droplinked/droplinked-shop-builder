import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import ImportProductButton from '../../common/ImportProductButton';
import ProductPrice from '../../common/ProductPrice';

const ProductCard = ({ product }) => {
  const image = product?.media?.find((mediaItem: any) => mediaItem.isMain)?.url || '';

  return (
    <Box
      borderWidth="1px"
      borderColor="#292929"
      borderRadius="2xl"
      display={{ base: 'none', lg: 'block' }}
      position={{ lg: 'sticky', md: 'relative' }}
      top={'80px'}
      width={{ base: '278px', lg: '306px', xl: '408px' }}
      flexShrink={0}
      flexDirection="column"
      alignItems="start"
      justifyContent="start"
    >
      <Flex direction="column" width="100%">
        {/* Product Info Section */}
        <Flex alignItems="start" gap={3} p={4}>
          <Image src={image} alt="Product" width={12} height={12} borderRadius="md" />
          <Flex direction="column" gap={1} flexGrow={1}>
            <Text fontSize="base" fontWeight="medium">
              {product?.title}
            </Text>
          </Flex>
        </Flex>
        {/* Divider */}
        <Divider borderColor="#292929" />
        {/* Price and Actions Section */}
        <Flex direction="column" gap={4} p={4}>
          <ProductPrice price={product.skuIDs?.[0]?.price} showAbbreviation={false} fontSize="28px" />
          <ImportProductButton productId={product._id}></ImportProductButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductCard;
