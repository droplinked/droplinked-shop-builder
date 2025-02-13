import { Box, Flex, Image, Text } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import React from 'react';

export default function AffiliateProductCard({ product }) {
  const { shopNavigate } = useCustomNavigate();
  const {
    shop: { currency }
  } = useAppStore();

  const imgSrc = product.media?.find((urls) => urls?.isMain)?.thumbnail || product.media?.[0]?.thumbnail || product.media?.[0]?.url;

  return (
    <Flex borderRadius="lg" flexDir="column" justify="start" align="center" gap={3} cursor="pointer" onClick={() => shopNavigate(`affiliate/products/${product.slug}`)}>
      {/* Product Image Container */}
      <Box position="relative" borderRadius="lg" overflow="hidden">
        {/* <Image src={image} w="full" h="full" objectFit="cover" borderRadius="lg" /> */}
        <Box position="relative" overflow="hidden" borderRadius="lg" aspectRatio="1">
          <Image src={imgSrc} alt={product.title} width="full" height="full" objectFit="cover" transition="transform 0.5s ease-in-out" _groupHover={{ transform: 'scale(1.04)' }} />
        </Box>

        {/* Discount Badge */}
        <Flex px={2} py={1} position="absolute" left={2} top={2} bg="whiteAlpha.700" borderRadius="md" shadow="md" border="1px solid #dddddd" backdropFilter="blur(10px)" align="center" gap={1}>
          <AppIcons.SidebarAffiliate color="black" />
          <Text fontSize="base" color="black" fontWeight="normal">
            {product.commission}%
          </Text>
        </Flex>
      </Box>

      {/* Product Info */}
      <Flex w="full" flexDir="column" gap={2}>
        {/* Store Info */}
        <Flex w="72" align="center" gap={2}>
          <Box w={5} h={5} overflow="hidden" borderRadius="full">
            <AppImage src={product.ownerShops?.logo} w="full" h="full" />
          </Box>
          <Flex flex={1} align="center" gap={2}>
            <Text fontSize="xs" color="white">
              {product.ownerShops?.name}
            </Text>
            <Box w={4} h={4} px="0.8" />
          </Flex>
        </Flex>

        {/* Product Details */}
        <Flex flexDir="column" gap={1}>
          <Text fontSize="base" color="white">
            {product.title}
          </Text>
          <Flex w="72" align="center" gap={1}>
            <Text fontSize="lg" fontWeight="medium" color="white">
              {currencyConvertion(product.skusIDs?.[0]?.price, currency?.conversionRateToUSD, false)} {currency?.abbreviation}
            </Text>
            <Text fontSize="lg" fontWeight="normal" color="#7b7b7b">
              {currency?.symbol}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
