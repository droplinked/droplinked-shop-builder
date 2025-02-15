import { Box, Text } from '@chakra-ui/react';
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import React from 'react';

function ProductPrice({
  product,
  fontSize = '36px',
  showAbbreviation = true
}: {
  product: any;
  fontSize?: string;
  showPrice?: boolean;
  showAbbreviation?: boolean; 
}) {
  const {
    shop: { currency }
  } = useAppStore();

  return (
    <Text fontSize={fontSize}>
      <Box as="span" fontWeight="bold" color={'white'}>
        {currency?.symbol}
        {currencyConvertion(product?.skuIDs?.[0]?.price, currency?.conversionRateToUSD, false)}
      </Box>

      {showAbbreviation && ( 
        <Box as="span" fontWeight="normal" color="#B1B1B1">
          {' '}
          {currency?.abbreviation}
        </Box>
      )}
    </Text>
  );
}

export default ProductPrice;
