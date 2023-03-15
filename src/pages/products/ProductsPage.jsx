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

import { useState, useEffect } from "react";

import { useApi } from "../../hooks/useApi/useApi";
import { getProduct } from "../../apis/productsApiService";
import { PageWrapper } from "./ProductsPage-style";

import PageHeader from "./components/page-header/PageHeader";
import AddProductComponent from "./components/add-product-component/AddProductComponent";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);

  const { getApi } = useApi();

  const getAllProducts = async () => {
    let result = await getApi(getProduct());
    if (result) setProducts(result);
    else setProducts([]);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log('products ', products)

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
        {products.length <= 0 && <AddProductComponent />}
      </PageWrapper>
    </Box>
  );
};

export default ProductsPage;
