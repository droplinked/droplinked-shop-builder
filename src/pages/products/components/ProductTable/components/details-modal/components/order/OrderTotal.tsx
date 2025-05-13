import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";


export const OrderTotal = ({ amount, currency }: { amount: number; currency: any }) => (
    <VStack align="start" spacing="4" p="6">
      <HStack justify="space-between" w="full">
        <Text fontSize="sm" fontWeight="normal" color="text.subtext.placeholder.dark">
          Total Paid
        </Text>
        <HStack spacing="1">
          <Text fontSize="sm" fontWeight="medium" color="white">
            {currency.symbol} {amount?.toFixed(2) || "0.00"} {currency?.abbreviation}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
  