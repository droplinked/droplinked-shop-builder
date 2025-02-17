import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ProductDetails from './components/details/ProductDetails';
import ProductPageLoading from './components/loading/ProductPageLoading';
import ProductSlider from './components/slider/ProductSlider';
import { getSingleProductCommunityService } from 'lib/apis/product/productServices';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import ProductDescription from './components/description/ProductDescription';

function AffiliateProductsSinglePage({ isPublic = false }) {
  const { profile } = useProfile();
  const params = useParams<{ slug: string }>();

  const { data: productData, isLoading } = useQuery(['product', params.slug], () => getSingleProductCommunityService({ slug: params.slug, user: Boolean(profile?._id) }), {
    enabled: !!params.slug,
    select: (data) => data?.data?.data
  });

  if (isLoading) return <ProductPageLoading />;

  return (
    <Flex  flexDirection={'column'} alignItems="center" justifyContent="center" width="full" mt={isPublic ? '80px' : undefined} px={isPublic ? { base: '60px', lg: '72px' } : undefined}>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: '24px', lg: '56px' }} width="full" mb={"80px"}>
        <Box width={{ base: '100%', lg: '40%' }}>
          <ProductSlider product={productData} />
        </Box>
        <Box width={{ base: '100%', lg: '60%' }}>
          <ProductDetails product={productData} />
        </Box>
      </Flex>
      <ProductDescription product={productData} />
    </Flex>
  );
}

export default AffiliateProductsSinglePage;
