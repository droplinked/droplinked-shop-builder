import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

export default function AffiliateProductCardPlaceholder() {
  return (
    <Flex
      borderRadius="lg"
      flexDir="column"
      justify="start"
      align="center"
      gap={3}
      cursor="pointer"
    >
      {/* Skeleton for Product Image */}
      <Box position="relative" borderRadius="lg" overflow="hidden" aspectRatio="1" w="72">
        <Skeleton w="full" h="full" borderRadius="lg" />
      </Box>

      {/* Skeleton for Store Info */}
      <Flex w="full" flexDir="column" gap={2}>
        <Flex w="72" align="center" gap={2}>
          <SkeletonCircle size="5" />
          <Flex flex={1} align="center" gap={2}>
            <Skeleton h="10px" w="60px" />
          </Flex>
        </Flex>

        {/* Skeleton for Product Details */}
        <Flex flexDir="column" gap={1}>
          <Skeleton h="15px" w="full" />
          <Flex w="72" align="center" gap={1}>
            <Skeleton h="20px" w="80px" />
            <Skeleton h="20px" w="20px" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
