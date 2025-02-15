import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

export default function AffiliateProductCardPlaceholder() {
  return (
    <Flex borderRadius="lg" flexDir="column" justify="start" align="center" gap={3} cursor="pointer">
      {/* Product Image Skeleton */}
      <Box position="relative" borderRadius="lg" overflow="hidden" >
        <Skeleton height="200px" width="full" borderRadius="lg"/>

        {/* Discount Badge Skeleton */}
        <Flex px={2} py={1} position="absolute" left={2} top={2} bg="whiteAlpha.700" borderRadius="md" shadow="md" border="1px solid #dddddd" backdropFilter="blur(10px)" align="center" gap={1}>
          <SkeletonCircle size="3" />
          <Skeleton width="50px" height="10px" />
        </Flex>
      </Box>

      {/* Product Info Skeleton */}
      <Flex w="full" flexDir="column" gap={2}>
        {/* Store Info Skeleton */}
        <Flex align="center" gap={2}>
          <SkeletonCircle size="5" />
          <Flex flex={1} align="center" gap={2}>
            <Skeleton width="60px" height="10px" />
          </Flex>
        </Flex>

        {/* Product Details Skeleton */}
        <Flex flexDir="column" gap={1}>
          <Skeleton width="100%" height="20px" />
          <Flex w="72" align="center" gap={1}>
            <Skeleton width="60px" height="20px" />
            <Skeleton width="40px" height="20px" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
