import { HStack, Text, VStack } from "@chakra-ui/react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from "react";
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';

export const OrderTotal = ({ amount, currency }: { amount: number; currency: any }) => {
    const { t } = useLocaleResources('products')
    
    return (
        <VStack align="start" spacing="4" p="6">
          <HStack justify="space-between" w="full">
            <Text fontSize="sm" fontWeight="normal" color="text.subtext.placeholder.dark">
              {t('OrderTotal.totalPaid')}
            </Text>
            <HStack spacing="1">
              <FormattedPrice price={amount} abbreviationProps={{ color: 'text.subtext.placeholder.light' }} fontSize="sm" fontWeight="medium" color="white" />
            </HStack>
          </HStack>
        </VStack>
      );
}
  