import { Box } from '@chakra-ui/react';
import React from 'react';
import ImportProductButton from '../common/ImportProductButton';
import ProductPrice from '../common/ProductPrice';
import ProducerInfoCard from './components/ProducerInfoCard';
import ProductOptions from './components/ProductOptions';
import ProductTitle from './components/ProductTitle';

function ProductDetails({ product }: { product: any }) {
  const price = Number(product?.skuIDs?.[0]?.price);

  return (
    <Box w={'100%'} display="flex" flexDirection="column" alignItems="flex-start" gap="36px" alignSelf="stretch">
      <ProductTitle product={product} />
      <ProductPrice price={price} />
      <ProductOptions product={product} />
      <ProducerInfoCard price={price} commission={product.commission} shopDetails={product.shopDetails} />
      <ImportProductButton productId={product._id}></ImportProductButton>
    </Box>
  );
}

export default ProductDetails;
