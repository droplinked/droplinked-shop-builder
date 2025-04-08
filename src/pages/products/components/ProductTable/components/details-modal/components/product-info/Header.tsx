import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppImage from "components/common/image/AppImage";
import React from "react";

export const ProductHeader = ({ product }) => {
  const mainImage = product?.media.find((media) => media.isMain === "true")?.url || "";

  return (
    <VStack spacing="4" w="full" align="start">
      <HStack justify="space-between" w="full">
        <AppImage src={mainImage} boxSize="48px" p="2" rounded="xl" alt="Product" />
        <HStack spacing="2">
          <Badge px="3" py="1.5" bg="rgba(43, 206, 161, 0.1)" rounded="full" color="rgba(43, 206, 161)">
            <HStack spacing="1">
              {product?.productCollectionID?.ruleSetID && <AppIcons.InvoiceDiscount color="#2BCFA1" />}
              <Text fontSize="sm">{product?.productCollectionID?.ruleSetID?.type}</Text>
              <Box boxSize="1" bg="rgba(43, 206, 161, 0.2)" rounded="full" />
              <Text fontSize="sm">{product?.productCollectionID?.ruleSetID?.discountPercentage}%</Text>
            </HStack>
          </Badge>

          <Badge p="1.5" bg="rgba(43, 206, 161, 0.1)" rounded="full" color="rgba(43, 206, 161)">
            <AppIcons.SidebarAffiliate color="#2BCFA1" />
          </Badge>

          <Badge p="1.5" bg="rgba(43, 206, 161, 0.1)" rounded="full" color="rgba(43, 206, 161)">
            <AppIcons.RulesetsIcon color="#2BCFA1" />
          </Badge>
        </HStack>
      </HStack>
      <Text color="white" fontSize="lg" fontWeight="medium">
        {product?.title}
      </Text>
    </VStack>
  );
};
