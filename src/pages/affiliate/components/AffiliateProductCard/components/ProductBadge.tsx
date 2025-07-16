import { Flex, Text } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';

interface ProductBadgeProps {
  commission: number;
  t: (key: string) => string;
}

export default function ProductBadge({ commission, t }: ProductBadgeProps) {
  return (
    <Flex px={2} py={1} position="absolute" left={2} top={2} bg="whiteAlpha.700" borderRadius="md" shadow="md" border="1px solid #ddd" backdropFilter="blur(10px)" align="center" gap={1}>
      <AppIcons.SidebarAffiliate color="black" />
      <Text fontSize="base" color="black">
        {t('AffiliateProductCard.commission').replace('{{commission}}', commission.toString())}
      </Text>
    </Flex>
  );
}
