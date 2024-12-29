import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import React from "react";
import ModalHeaderIconWrapper from "components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper";

const Header: React.FC = () => {
  return (
    <Box width="100%">
      <Box >
        <ModalHeaderData
          icon={
            <ModalHeaderIconWrapper>
              <AppIcons.HeaderProductBox />
            </ModalHeaderIconWrapper>
          }
          title="Drop Information"
          description={`Organize products by dragging and dropping them in the order that they should be displayed on the storefront.`}
        />
      </Box>
      <Box mb="24px" />

      <Flex
        padding="16px 24px 16px 16px"
        alignItems="center"
        gap="24px"
        bg="#292929"
        borderRadius="12px"
        border="1px solid #292929"
        ml="48px"
        mr="48px"
      >
        <Image
          rounded="md"
          src="https://via.placeholder.com/56x56"
          alt="Product Image"
        />
        <VStack align="flex-start" spacing="4px" flex="1">
          <Text color="white" fontSize="base" fontWeight="bold">
            Apple iPhone 13 Pro Max
          </Text>
          <HStack spacing="3">
            <HStack spacing="2">
              <Box boxSize="4" bg="#179ef8" rounded="sm" />
              <Text color="white" fontSize="sm">
                Blue
              </Text>
            </HStack>
            <Box boxSize="1" bg="#3c3c3c" rounded="full" />
            <Text color="white" fontSize="sm">
              Small
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Header;
