import { getProductsCommunityService } from 'services/product/productServices';
import React, { useContext } from 'react';
import { useInfiniteQuery } from 'react-query';
import { ProductContext } from '../context/context';
import ProductsGridRenderer from '../../components/ProductsGridRenderer';

const AffiliateProductList = ({ isPublic }) => {
  const { filters } = useContext(ProductContext);

  const fetchProducts = async ({ pageParam = 1 }) => {
    const response = await getProductsCommunityService({ ...filters, page: pageParam });
    return response?.data?.data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['products-affiliate', filters],
    queryFn: fetchProducts,
    getNextPageParam: (pagination, pages) => {
      return pagination?.hasNextPage ? pages.length + 1 : undefined;
    }
  });

  return <ProductsGridRenderer isPublic={isPublic} data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isLoading={isLoading} isError={isError} />;
};

export default AffiliateProductList;
