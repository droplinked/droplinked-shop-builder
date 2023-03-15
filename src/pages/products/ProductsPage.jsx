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
  Tr,
  Th,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../../hooks/useProfile/useProfile";

import { PageWrapper } from "./ProductsPage-style";

import PageHeader from "./components/page-header/PageHeader";

import plusIcon from "../../assest/icon/plus-icon.svg";
import addProductIcon from "../../assest/icon/add-item-green-icon.svg";
import variantsIcon from "../../assest/icon/products-active-icon.svg";
import collectionIcon from "../../assest/icon/collection-active-icon.svg";
import ruleIcon from "../../assest/icon/rulesets-active-icon.svg";
//

const ProductsPage = () => {
  const navigate = useNavigate();
  const { shop } = useProfile();

  const navigateToAddProductPage = () => navigate(`/${shop.name}/add-product`);
  return (
    <Box w="100%" h="auto" p="0px 40px">
      <PageWrapper>
        <PageHeader />
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
            onClick={navigateToAddProductPage}
          >
            <Image src={plusIcon} h="48px" w="48px" />
            <Box mb="24px" />
            <Text color="#fff" fontWeight="500" fontSize="18px">
              Add Product
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
              <Image src={addProductIcon} w="18px" h="18px" />
              <Text
                fontFamily="Avenir Next"
                fontWeight="400"
                fontSize="14px"
                color="#C2C2C2"
              >
                Interoduce your product
              </Text>
            </Flex>
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
                Set your invetory variants and quantities
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
                Set collection
              </Text>
            </Flex>
            <Flex
              w="auto"
              alignItems="center"
              justifyContent="center"
              gap="24px"
              mb="12px"
            >
              <Image src={ruleIcon} w="18px" h="18px" />
              <Text
                fontFamily="Avenir Next"
                fontWeight="400"
                fontSize="14px"
                color="#C2C2C2"
              >
                Set Crypto based rules for your purchases
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </PageWrapper>
    </Box>
  );
};

export default ProductsPage;
