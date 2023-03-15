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
import AddProductComponent from "./components/add-product-component/AddProductComponent";

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
       <AddProductComponent />
      </PageWrapper>
    </Box>
  );
};

export default ProductsPage;
