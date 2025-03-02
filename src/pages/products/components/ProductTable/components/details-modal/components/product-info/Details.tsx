import { Box, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { typesProperties } from "utils/constants/types";
import React from "react";

export const ProductDetails = ({ product }) => {
  return (
    <Box w="full" borderWidth="1px" borderColor="#282828" borderRadius="lg" overflow="hidden">
      {product?.skuIDs?.map((sku, index) => {
        const colorOption = sku.options.find((option) => option.variantID === typesProperties[0]?._id);
        const sizeOption = sku.options.find((option) => option.variantID === typesProperties[1]?._id);

        return (
          <VStack key={index} w="full" spacing="2.5" align="start">
            <HStack w="full" p="4" justify="space-between" align="center">
              {/* Color and Size */}
              <HStack spacing="3">
                <Flex align="center" justify="center" rounded="sm" bg={colorOption?.value} boxSize="4" />
                <Text fontSize="sm" color="white">
                  {colorOption?.caption}
                </Text>
                <Box boxSize="1" bg="#282828" rounded="full" />
                <Text fontSize="sm" color="white">
                  {sizeOption?.caption}
                </Text>
              </HStack>

              {/* Sold and Quantity */}
              <HStack spacing="0.5">
                <Text fontSize="sm" color="white">
                  {sku.sold_units || "0"} /
                </Text>
                <Text fontSize="sm" color="#7b7b7b">
                  {sku.quantity || "0"}
                </Text>
              </HStack>

              {/* Price */}
              <HStack spacing="1">
                <Text fontSize="sm" color="white">
                  ${sku.price || "0"}
                </Text>
                <Text fontSize="sm" color="#b1b1b1">
                  USD
                </Text>
              </HStack>
            </HStack>
            {index < product.skuIDs.length - 1 && <Divider borderColor="#282828" />}
          </VStack>
        );
      })}
    </Box>
  );
};
