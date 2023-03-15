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
  Text,
} from "@chakra-ui/react";

import searchIcon from "../../assest/icon/search-icon.svg";
import plusIcon from "../../assest/icon/plus-icon.svg";

const ProductsPage = () => {
  return (
    <Box w="100%" h="auto" p="0px 40px">
      <Box w="100%" bg="mainLayer" borderRadius="8px" p="36px 48px">
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb="24px"
        >
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

        <TableContainer mb="36px">
          <Table>
            <Thead>
              <Tr borderColor="red">
                <Th w="35%" color="white">
                  Product
                </Th>
                <Th w="35%" color="white">
                  Collections
                </Th>
                <Th w="15%" color="white">
                  Inventory
                </Th>
                <Th w="15%" color="white">
                  Status
                </Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
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
          >
            <Image src={plusIcon} h="48px" w="48px" />
            <Box mb="24px" />
            <Text color="#fff" fontWeight="500" fontSize="18px">
              Add Product
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductsPage;
