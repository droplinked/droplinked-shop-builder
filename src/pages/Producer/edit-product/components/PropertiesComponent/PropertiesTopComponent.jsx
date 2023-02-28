import { Flex } from "@chakra-ui/react";

import {
  Text16px400,
  Text14px400,
  GrayLine,
} from "../../EditProductPage-style";
// this component is header of properties component
const PropertiesTopComponent = () => {
  return (
    <Flex w="100%" alignItems="center" gap="100px" mb="48px">
      <Text16px400>Required</Text16px400>

      <Flex w="calc(100% - 150px)" justifyContent="space-between" h="100%">
        <Text14px400>Price</Text14px400>
        <GrayLine />
        <Text14px400>Quantity</Text14px400>
        <GrayLine />
        <Text14px400>External ID</Text14px400>
        <GrayLine />
        <Text14px400>Delivery boxing information</Text14px400>
      </Flex>
    </Flex>
  );
};

export default PropertiesTopComponent
