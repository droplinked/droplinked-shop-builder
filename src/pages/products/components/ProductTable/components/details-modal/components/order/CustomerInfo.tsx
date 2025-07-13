import { HStack, Text, VStack } from "@chakra-ui/react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from "react";

export const CustomerInfo = ({ customer }: { customer: any }) => {
    const { t } = useLocaleResources('products')
    
    return (
        <VStack spacing="4" w="full" align="start">
          {["name", "email"].map((field, idx) => (
            <HStack key={idx} justify="space-between" w="full">
              <Text fontSize="sm" fontWeight="normal" color="text.subtext.placeholder.dark">
                {field === "name" ? t('customerInfo.fullName') : t('customerInfo.emailAddress')}
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="white">
                {customer?.[field] || "----"}
              </Text>
            </HStack>
          ))}
        </VStack>
      );
}
  