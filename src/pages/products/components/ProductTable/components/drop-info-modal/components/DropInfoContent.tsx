import { Box, Flex, Text, VStack, HStack, Divider } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import React from "react";

const DropInfoContent = ({ product }) => {
  return (
    <Flex p="12" direction="column" justify="start" align="start" gap="4">
      <Box
        w="full"
        borderWidth="1px"
        borderColor="#282828"
        borderRadius="2xl"
        overflow="hidden"
        bg="transparent"
      >
        <VStack w="full" h="176px" p="6" spacing="4" align="start">
          {/* Deploy Hash */}
          <HStack w="full" justify="space-between">
            <HStack spacing="1" align="center">
              <Text color="#7b7b7b" fontSize="sm">
                Deploy Hash
              </Text>
              <AppIcons.Info />
            </HStack>
            <HStack spacing="3" flex="1" justify="flex-end" align="center">
              <Text
                id="deploy-hash"
                color="#179ef8"
                fontSize="sm"
                fontWeight="medium"
                textDecoration="underline"
                isTruncated
                maxW="200px"
              >
                e0327b0924cf37e0327b0924cf37e0327b0924cf37a3284c
              </Text>
              <Box
                as="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    document.getElementById("deploy-hash").innerText
                  )
                }
              >
                <AppIcons.Copy />
              </Box>
            </HStack>
          </HStack>

          {/* Dropped On */}
          <HStack w="full" justify="space-between">
            <Text color="#7b7b7b" fontSize="sm">
              Dropped on
            </Text>
            <HStack spacing="1" align="center">
              <AppIcons.CasperIcon />
              <Text color="white">Casper</Text>
            </HStack>
          </HStack>

          {/* Affiliate Collaborators */}
          <HStack w="full" justify="space-between">
            <Text color="#7b7b7b" fontSize="sm">
              Affiliate Collaborators:
            </Text>
            <Text color="#179ef8" fontSize="sm" fontWeight="medium">
              12 Stores
            </Text>
          </HStack>

          {/* Commission */}
          <HStack w="full" justify="space-between">
            <Text color="#7b7b7b" fontSize="sm">
              Commission
            </Text>
            <Text color="white" fontSize="sm" fontWeight="medium">
              12%
            </Text>
          </HStack>
        </VStack>

        <Divider borderColor="#282828" />

        {/* Variant Price */}
        <VStack w="full" h="68px" p="6" spacing="6" align="start">
          <HStack w="full" justify="space-between">
            <Text color="#7b7b7b" fontSize="sm">
              Variant Price
            </Text>
            <HStack spacing="1" align="center">
              <Text color="white" fontSize="sm" fontWeight="medium">
                $123.00
              </Text>
              <Text color="#b1b1b1" fontSize="sm" fontWeight="medium">
                USD
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default DropInfoContent;
