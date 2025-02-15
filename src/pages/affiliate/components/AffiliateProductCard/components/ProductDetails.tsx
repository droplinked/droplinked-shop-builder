import { Flex, Text } from '@chakra-ui/react';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import React from 'react';

export default function ProductDetails({ title, price, currency }) {
  return (
    <Flex flexDir="column" gap={1}>
      <Text fontSize="base" color="white" noOfLines={2}>
        {title}
      </Text>
      <Flex align="center" gap={1}>
        <Text fontSize="lg" fontWeight="medium" color="white">
          {currencyConvertion(price, currency?.conversionRateToUSD, false)} {currency?.abbreviation}
        </Text>
        <Text fontSize="lg" fontWeight="normal" color="#7b7b7b">
          {currency?.symbol}
        </Text>
      </Flex>
    </Flex>
  );
}
