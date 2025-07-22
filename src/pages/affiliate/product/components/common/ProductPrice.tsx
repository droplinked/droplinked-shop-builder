import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';

interface ProductPriceProps {
  price: number;
  fontSize?: string;
  showAbbreviation?: boolean;
}

function ProductPrice({ price, fontSize = '36px', showAbbreviation = true }: ProductPriceProps) {
  return (
    <FormattedPrice
      price={price}
      fontSize={fontSize}
      abbreviationProps={showAbbreviation ? { color: '#B1B1B1', fontWeight: 'normal' } : { display: 'none' }}
      fontWeight="bold"
      color="white"
    />
  );
}

export default ProductPrice;
