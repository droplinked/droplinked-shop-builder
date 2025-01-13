import { Box, Flex, Image, Text } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import ModalHeaderIconWrapper from "components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import React from "react";

const Header = ({ product }) => {
  const mainImage = product?.media.find((media) => media.isMain === "true")?.url || "";

  return (
    <Box width="100%">
      <ModalHeaderData
        icon={
          <ModalHeaderIconWrapper>
            <AppIcons.HeaderProductBox />
          </ModalHeaderIconWrapper>
        }
        title="Drop Information"
      />
      <Box mb="24px" />

      <Flex
        padding={4}
        paddingRight={6}
        alignItems="center"
        gap={4}
        bg="#292929"
        borderRadius="12px"
        border="1px solid #292929"
        ml="48px"
        mr="48px"
      >
        <Image
          height={"56px"}
          width={"56px"}
          borderRadius={6}
          src={mainImage}
          alt="Product Image"
        />
        <Text fontWeight={700} color="white">{product.title}</Text>
      </Flex>
    </Box>
  );
};

export default Header;
