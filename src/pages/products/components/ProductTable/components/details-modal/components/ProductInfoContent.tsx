import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { ProductDetails } from "./product-info/Details";
import { ProductFooter } from "./product-info/Footer";
import { ProductHeader } from "./product-info/Header";

const ProductInfoContent = ({ product }) => {
  return (
    <Flex p="9" direction="column" justify="start" align="start" gap="4">
      <Box w="full" borderWidth="1px" borderColor="#282828" borderRadius="2xl" overflow="hidden" bg="transparent">
        <VStack w="full" p="6" spacing="6" align="start">
          <ProductHeader product={product} />
          <ProductDetails product={product} />
        </VStack>
        {/* Footer */}
        <Divider borderColor="#282828" />
        <ProductFooter product={product} />
      </Box>
    </Flex>
  );
};

export default ProductInfoContent;
