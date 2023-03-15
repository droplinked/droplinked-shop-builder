import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
} from "@chakra-ui/react";

import searchIcon from "../../assest/icon/search-icon.svg";

const ProductsPage = () => {
  return (
    <Box
      w="100%"
      bg="mainLayer"
      borderRadius="8px"
      p="36px 48px"
      h="auto"
      mx="40px"
    >
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <InputGroup w="200px" >
          <InputLeftElement
            pointerEvents="none"
            children={<Image src={searchIcon} h="16px" w="16px" />}
          />
          <Input
          p='8px 36px'
            borderRadius="24px"
            border="1px solid"
            borderColor="line"
            fontFamily="Avenir Next"
            fontWeight="400"
            fontSize="12px"
            color="#C2C2C2"
            placeholder="Phone number"
            _focus={{
             //   borderColor:"line"
            }}
          />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default ProductsPage;
