import { Flex, VStack } from '@chakra-ui/react';
import { IGetProductsCommunityService } from 'services/product/interfaces';
import { productCategoryervices } from 'services/product/productServices';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ActionBar from './components/ActionBar';
import AffiliateProductList from './components/AffiliateProductList';
import FiltersPanel from './components/filterPanel/FilterPanel';
import { IAffiliateProductsCategory, ProductContext } from './context/context';

const INITIAL_FILTERS: IGetProductsCommunityService = {
  limit: 20,
  page: 1,
  title: undefined,
  categoryIds: [],
  subCategoryIds: undefined,
  lowestPrice: 0,
  highestPrice: 1000,
  lowestCommission: 0,
  highestCommission: 100,
  sort: undefined
};

const AffiliateProductsPage = (props) => {
  const { isPublic } = props.loaderData;

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<IGetProductsCommunityService>(INITIAL_FILTERS);

  const { data: categories = [], isLoading, error } = useQuery<IAffiliateProductsCategory[], Error>('categories', async () => (await productCategoryervices()).data.data);
  const handleFilterChange = (key: keyof IGetProductsCommunityService, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ProductContext.Provider value={{ categories, isLoading, error: error?.message || null, filters, setFilters: handleFilterChange }}>
      <VStack align="stretch" width="full" spacing="24px" py={isPublic ? '90px' : undefined} px={isPublic ? { base: '60px', lg: '72px' } : undefined}>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems="flex-start" gap="24px" position="relative" >
          <FiltersPanel isPublic={isPublic} showFilters={showFilters} setShowFilters={setShowFilters} filters={filters} handleFilterChange={handleFilterChange} categories={categories} />
          <VStack width="full" spacing="24px">
            <ActionBar setShowFilters={setShowFilters} filters={filters} handleFilterChange={handleFilterChange} />
            <AffiliateProductList isPublic={isPublic} />
          </VStack>
        </Flex>
      </VStack>
    </ProductContext.Provider>
  );
};

export default AffiliateProductsPage;
