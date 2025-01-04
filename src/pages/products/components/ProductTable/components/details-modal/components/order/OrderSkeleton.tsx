import { Box, Divider, HStack, VStack } from "@chakra-ui/react";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import React from "react";

export const OrderSkeleton = () => (
  <>
    {[...Array(2)].map((_, index) => (
      <Box
        key={index}
        w="full"
        borderWidth="1px"
        borderColor="#282828"
        borderRadius="2xl"
        bg="transparent"
        overflow="hidden"
      >
        <VStack align="start" spacing="6" p="6">
          <VStack align="stretch" w="full">
            <AppSkeleton isLoaded={false} height="20px" width="30%" />
            <AppSkeleton isLoaded={false} height="15px" width="50%" />
          </VStack>
          <VStack spacing="4" w="full" align="start">
            {[...Array(2)].map((_, idx) => (
              <HStack key={idx} justify="space-between" w="full">
                <AppSkeleton isLoaded={false} height="15px" width="20%" />
                <AppSkeleton isLoaded={false} height="15px" width="30%" />
              </HStack>
            ))}
          </VStack>
        </VStack>
        <Divider borderColor="#282828" />
        <VStack align="start" spacing="4" p="6">
          <HStack justify="space-between" w="full">
            <AppSkeleton isLoaded={false} height="15px" width="20%" />
            <AppSkeleton isLoaded={false} height="15px" width="30%" />
          </HStack>
        </VStack>
      </Box>
    ))}
  </>
);

export default OrderSkeleton;
