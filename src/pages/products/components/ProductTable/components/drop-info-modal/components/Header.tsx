import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import ModalHeaderIconWrapper from "components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import React from "react";

const Header = ({product}) => {
  const mainImage = product?.media.find((media) => media.isMain === "true")?.url || "";
  
  return (
    <Box width="100%" >
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
          src={mainImage}
          height={"56px"}
          width={"56px"}
          alt="Product Image"
        />
        <VStack align="flex-start" spacing="4px" flex="1">
          <Text color="white" fontSize="base" fontWeight="bold">
            {product.title}
          </Text>
         
        </VStack>
      </Flex>
    </Box>
  );
};

export default Header;
