import { Box, Text } from '@chakra-ui/react';
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import React from 'react';

interface props {
  price: number;
  fontSize?: string;
  showPrice?: boolean;
  showAbbreviation?: boolean;
}

function ProductPrice({ price, fontSize = '36px', showAbbreviation = true }: props) {
  const { isLoggedIn, shop } = useAppStore();
  const currency = shop?.currency;

  // Default values for non-logged-in users
  let displayPrice: number = price;
  let currencyAbbr = 'USD';
  let currencySymbol = '$';

  // Apply currency conversion if user is logged in and currency data exists
  if (isLoggedIn && currency) {
    displayPrice = currencyConvertion(price, currency.conversionRateToUSD, false);
    currencyAbbr = currency.abbreviation;
    currencySymbol = currency.symbol;
  }

  return (
    <Text fontSize={fontSize}>
      <Box as="span" fontWeight="bold" color={'white'}>
        {currencySymbol}
        {displayPrice}
      </Box>
      {showAbbreviation && (
        <Box as="span" fontWeight="normal" color="#B1B1B1">
          {' '}{currencyAbbr}
        </Box>
      )}
    </Text>
  );
}

export default ProductPrice;
