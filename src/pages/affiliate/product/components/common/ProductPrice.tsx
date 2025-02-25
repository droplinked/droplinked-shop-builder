import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';

interface ProductPriceProps {
  price: number;
  fontSize?: string;
  showAbbreviation?: boolean;
}

function ProductPrice({ price, fontSize = '36px', showAbbreviation = true }: ProductPriceProps) {
  const { convertPrice, symbol, abbreviation } = useCurrencyConverter();
  const displayPrice = convertPrice({ amount: price, toFixed: true }).toFixed(2);

  return (
    <Text fontSize={fontSize}>
      <Box as="span" fontWeight="bold" color="white">
        {symbol}
        {displayPrice}
      </Box>
      {showAbbreviation && (
        <Box as="span" fontWeight="normal" color="#B1B1B1">
          {' '} {abbreviation}
        </Box>
      )}
    </Text>
  );
}

export default ProductPrice;
