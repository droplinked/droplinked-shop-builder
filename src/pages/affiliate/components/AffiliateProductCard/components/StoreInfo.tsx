import { Box, Flex, Text } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import React from 'react';

export default function StoreInfo({ shop }) {
  return (
    <Flex align="center" gap={2}>
      <Box w={5} h={5} overflow="hidden" borderRadius="full">
        <AppImage src={shop?.logo} w="full" h="full" />
      </Box>
      <Text fontSize="xs" color="white">
        {shop?.name}
      </Text>
    </Flex>
  );
}
