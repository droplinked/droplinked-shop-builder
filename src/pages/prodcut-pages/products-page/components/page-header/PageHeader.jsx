import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";

import { useCustomNavigate } from "../../../../../hooks/useCustomeNavigate/useCustomNavigate";

import searchIcon from "../../../../../assest/icon/search-icon.svg";
import downArrowIcon from "../../../../../assest/icon/down-arrow-icon.svg";
//
const PageHeader = ({ searchValue, setSearchValue }) => {
  const { shopNavigate } = useCustomNavigate();

  const navigateToAddProductPage = () => shopNavigate(`add-product`);

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" mb="24px">
      <Stack direction="row" spacing={4}>
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
            fontSize="sm"
            color="#C2C2C2"
            placeholder="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
        <Button
          _focus={{ outline: "none" }}
          variant="unstyled"
          color="lightGray"
          display="flex"
          fontSize="sm"
          alignItems="center"
          gap={2}
        >
          sort by date
          <Image src={downArrowIcon} />
        </Button>
        <Button
          _focus={{ outline: "none" }}
          variant="unstyled"
          color="lightGray"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={2}
        >
          filter
          <Image src={downArrowIcon} />
        </Button>
      </Stack>
      <Stack direction="row" spacing={4}>
        <Button
          colorScheme="whiteAlpha"
          variant="outline"
          borderRadius="6px"
          border="1px solid"
          borderColor="#292929"
        >
          Import from Shopify
        </Button>
        <Button
          bg="#2EC99E"
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
      </Stack>
    </Flex>
  );
};
export default PageHeader;
