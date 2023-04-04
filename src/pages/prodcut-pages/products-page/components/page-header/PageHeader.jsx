import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Button,
} from "@chakra-ui/react";

import { useCustomNavigate } from "../../../../../hooks/useCustomeNavigate/useCustomNavigate"

import searchIcon from "../../../../../assest/icon/search-icon.svg";

const PageHeader = () => {

const { shopNavigate } =  useCustomNavigate()

  const navigateToAddProductPage = () => shopNavigate(`add-product`);

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" mb="24px">
      <InputGroup w="200px">
        <InputLeftElement
          pointerEvents="none"
          children={<Image src={searchIcon} h="16px" w="16px" />}
        />
        <Input
          p="8px 36px"
          borderRadius="24px"
          border="1px solid"
          borderColor="line"
          fontFamily="Avenir Next"
          fontWeight="400"
          fontSize="12px"
          color="#C2C2C2"
          placeholder="Phone number"
          _focus={
            {
              //   borderColor:"line"
            }
          }
        />
      </InputGroup>
      <Button
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="12px 16px"
        width="120px"
        background="#2EC99E"
        borderRadius="6px"
        border="1px solid"
        borderColor="primary"
        _hover={{
          bg: "mainLayer",
          color: "primary",
        }}
        onClick={navigateToAddProductPage}
      >
        Add Product
      </Button>
    </Flex>
  );
};
export default PageHeader;
