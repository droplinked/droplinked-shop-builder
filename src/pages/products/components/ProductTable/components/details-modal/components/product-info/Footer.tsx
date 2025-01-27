import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const ProductFooter = ({ product }) => (
  <VStack p="6" spacing="4" align="start">
    <HStack justify="space-between" w="full">
      <Text fontSize="sm" color="#7b7b7b">
        Sold Items
      </Text>
      <Text fontSize="sm" color="white">
        {product?.soldItems || "0"}
      </Text>
    </HStack>
    <HStack justify="space-between" w="full">
      <Text fontSize="sm" color="#7b7b7b">
        Total Sale
      </Text>
      <HStack spacing="1">
        <Text fontSize="sm" color="white" fontWeight="medium">
          ${product?.totalSale || "0"}
        </Text>
        <Text fontSize="sm" color="#b1b1b1">
          USD
        </Text>
      </HStack>
    </HStack>
  </VStack>
);
