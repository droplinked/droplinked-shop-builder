import { VStack } from '@chakra-ui/react';
import { getHotProducts, getNewProducts } from 'lib/apis/product/productServices';
import { getNewShopsService } from 'lib/apis/shop/shopServices';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AffiliateMarketHero } from './components/AffiliateMarketHero';
import { HotProductsSection } from './components/HotProductsSection';
import { NewMerchantsSection } from './components/NewMerchantsSection';
import { NewProductsSection } from './components/NewProductsSection';
import { dates_constant, DateTypes } from './constants/date.constants';

const AffiliateMarket = () => {
  // Controls the date filter for hot products (default: "This month")
  const [date, setDate] = useState<DateTypes>(dates_constant[2]);

  // Fetch new merchants data
  const { data: newShops, isLoading: isLoadingNewShops } = useQuery({
    queryKey: ['new-shops-service'],
    queryFn: getNewShopsService
  });

  // Fetch new products data
  const { data: newProducts, isLoading: isLoadingNewProducts } = useQuery({
    queryKey: ['new-products'],
    queryFn: getNewProducts
  });

  // Fetch hot products based on selected date filter
  const { data: hotProducts, isLoading: isLoadingHotProducts } = useQuery({
    queryKey: ['hot-products', date?.value],
    queryFn: () => getHotProducts({ range: date?.value })
  });

  return (
    <VStack spacing="36px">
      <AffiliateMarketHero />
      <NewProductsSection isLoading={isLoadingNewProducts} products={newProducts} />
      <NewMerchantsSection isLoading={isLoadingNewShops} shops={newShops} />
      <HotProductsSection isLoading={isLoadingHotProducts} products={hotProducts} date={date} setDate={setDate} />
    </VStack>
  );
};

export default AffiliateMarket;
