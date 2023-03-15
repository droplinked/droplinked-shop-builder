import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import searchIcon from "../../assest/icon/search-icon.svg";

const ProductsPage = () => {
  return (
    <Box w="100%" h="auto" p="0px 40px">
      <Box w="100%" bg="mainLayer" borderRadius="8px" p="36px 48px">
        <Flex w="100%" justifyContent="space-between" alignItems="center" mb='24px'>
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
          >
            Add Product
          </Button>
        </Flex>

        <TableContainer border='1px solid red'>
          <Table variant="simple">
          <Thead>
      <Tr>
        <Th w='35%'>Product</Th>
        <Th w='35%'>Collections</Th>
        <Th w='15%'>Inventory</Th>
        <Th w='15%'>Status</Th>
      </Tr>
    </Thead>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProductsPage;
