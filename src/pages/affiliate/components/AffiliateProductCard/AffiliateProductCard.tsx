import { Box, Flex, Image } from '@chakra-ui/react';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductBadge from './components/ProductBadge';
import ProductDetails from './components/ProductDetails';
import ProductImageSlider from './components/productImageSlider/ProductImageSlider';
import StoreInfo from './components/StoreInfo';

export default function AffiliateProductCard({ product, isPublic = false }) {
  const { shopNavigate } = useCustomNavigate();
  const productImages = product.media?.slice(0, 3).map((item) => item?.thumbnail || item?.url) || [];
  const mainProductImage = product.media?.find((img) => img?.isMain)?.thumbnail || product.media?.[0]?.thumbnail || product.media?.[0]?.url;

  const handleNavigation = () => {
    const targetUrl = `/affiliate/products/${product.slug}`;
    if (isPublic) {
      window.location.href = targetUrl;
    } else {
      shopNavigate(targetUrl);
    }
  };

  return (
    <Flex borderRadius="lg" flexDir="column" align="center" gap={3} cursor="pointer" onClick={handleNavigation}>
      {/* Product Image Section */}
      <Box w="full" position="relative" borderRadius="lg" overflow="hidden">
        {productImages.length > 1 ? (
          <ProductImageSlider productImages={productImages} />
        ) : (
          <Box position="relative" overflow="hidden" borderRadius="lg" aspectRatio="1">
            <Image src={mainProductImage} alt={product.title} w="full" h="full" objectFit="cover" transition="transform 0.3s ease-in-out" _hover={{ transform: 'scale(1.1)' }} />
          </Box>
        )}
        <ProductBadge commission={product.commission} />
      </Box>
      {/* Product Info */}
      <Flex w="full" flexDir="column" gap={2}>
        <StoreInfo shop={product.ownerShops} />
        <ProductDetails title={product.title} price={product.skus?.[0]?.price || product.skuIDs?.[0]?.price} />
      </Flex>
    </Flex>
  );
}
