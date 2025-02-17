import { Flex, Text } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React from 'react';

export default function ProductBadge({ commission }) {
  return (
    <Flex px={2} py={1} position="absolute" left={2} top={2} bg="whiteAlpha.700" borderRadius="md" shadow="md" border="1px solid #ddd" backdropFilter="blur(10px)" align="center" gap={1}>
      <AppIcons.SidebarAffiliate color="black" />
      <Text fontSize="base" color="black">
        {commission}%
      </Text>
    </Flex>
  );
}
