import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Button,
} from "@chakra-ui/react";

import searchIcon from "../../../../assest/icon/search-icon.svg";

const SearchComponent = () => {
  return (
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
        placeholder="Search"
        _focus={
          {
            //   borderColor:"line"
          }
        }
      />
    </InputGroup>
  );
};

export default SearchComponent;
