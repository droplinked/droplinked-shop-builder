import { Flex, Text } from '@chakra-ui/react';
import ProductPrice from 'pages/affiliate/product/components/common/ProductPrice';
import React from 'react';

export default function ProductDetails({ title, price }) {
  return (
    <Flex flexDir="column" gap={1}>
      <Text fontSize="base" color="white" noOfLines={2}>
        {title}
      </Text>
      <Flex align="center" gap={1}>
        <ProductPrice price={price} fontSize={'lg'}></ProductPrice>
      </Flex>
    </Flex>
  );
}
