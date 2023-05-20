import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { useCustomNavigate } from "../../../../../hooks/useCustomeNavigate/useCustomNavigate";
//
import plusIcon from "../../../../../assest/icon/plus-icon.svg";
import variantsIcon from "../../../../../assest/icon/products-active-icon.svg";
import collectionIcon from "../../../../../assest/icon/collection-active-icon.svg";
import tearIcon from "../../../../../assest/icon/tear-icon.svg";
//
const AddProductComponent = () => {
  const { shopNavigate } = useCustomNavigate();

  const navigateToAddProductPage = () => shopNavigate(`products/create`);

  return (
    <Flex
      w="100%"
      p="36px 60px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w="169px"
        h="148px"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        bg="subLayer"
        borderRadius="8px"
        cursor="pointer"
        onClick={navigateToAddProductPage}
      >
        <Image src={plusIcon} h="48px" w="48px" />
        <Box mb="24px" />
        <Text color="#fff" fontWeight="500" fontSize="18px">
          New product
        </Text>
      </Flex>
      <Box mb="50px" />
      <Flex w="auto" flexDir="column" alignItems="start">
        <Flex
          w="auto"
          alignItems="center"
          justifyContent="center"
          gap="24px"
          mb="12px"
        >
          <Image src={variantsIcon} w="18px" h="18px" />
          <Text
            fontFamily="Avenir Next"
            fontWeight="400"
            fontSize="14px"
            color="#C2C2C2"
          >
            Introduce your product
          </Text>
        </Flex>
        <Flex
          w="auto"
          alignItems="center"
          justifyContent="center"
          gap="24px"
          mb="12px"
        >
          <Image src={collectionIcon} w="18px" h="18px" />
          <Text
            fontFamily="Avenir Next"
            fontWeight="400"
            fontSize="14px"
            color="#C2C2C2"
          >
            Categorize into a collection
          </Text>
        </Flex>
        <Flex
          w="auto"
          alignItems="center"
          justifyContent="center"
          gap="24px"
          mb="12px"
        >
          <Image src={tearIcon} w="18px" h="18px" />
          <Text
            fontFamily="Avenir Next"
            fontWeight="400"
            fontSize="14px"
            color="#C2C2C2"
          >
            Record and track earnings and commissions on-chain
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddProductComponent;
