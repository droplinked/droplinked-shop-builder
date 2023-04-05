import {
  Box,
  Tbody,
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";

import { useState, useEffect, useMemo } from "react";

import { useApi } from "../../../hooks/useApi/useApi";
import { getProduct } from "../../../apis/productsApiService";
import { PageWrapper } from "./ProductsPage-style";

import PageHeader from "./components/page-header/PageHeader";
import AddProductComponent from "./components/add-product-component/AddProductComponent";
import ProductComponent from "./components/product-component/ProductCompnent";
import Loading from "../../../components/shared/loading/Loading";
import { matchSorter } from "match-sorter";

const ProductsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState(null);

  const { getApi } = useApi();

  const getAllProducts = async () => {
    let result = await getApi(getProduct());
    if (result) setProducts(result);
    else setProducts([]);
  };

  const tableData = useMemo(() => {
    if (!searchValue) return products;
    return matchSorter(products, searchValue, {
      keys: ["title", "productCollectionID.title"],
    });
  }, [searchValue, products]);

  useEffect(() => {
    getAllProducts();
  }, []);

  if (!products)
    return (
      <Box w="100%" h="auto" p="0px 40px">
        <PageWrapper>
          <Loading />
        </PageWrapper>
      </Box>
    );

  return (
    <Box w="100%" h="auto" p="0px 40px">
      <PageWrapper>
        <PageHeader searchValue={searchValue} setSearchValue={setSearchValue} />
        <TableContainer mb="36px">
          <Table>
            <Thead borderY="1px solid" borderColor="line">
              <Tr>
                {[
                  {
                    width: "35%",
                    label: "Products",
                  },
                  {
                    width: "35%",
                    label: "Collections",
                  },
                  {
                    width: "15%",
                    label: "Status",
                  },
                  {
                    width: "15%",
                    label: "Inventory status",
                  },
                ].map((item) => (
                  <Th
                    py={4}
                    fontSize="12px"
                    key={item.label}
                    w={item.width}
                    color="white"
                    border="none"
                  >
                    {item.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {tableData.length > 0 && (
              <Tbody>
                {tableData.map((item, i) => (
                  <ProductComponent
                    key={i}
                    product={item}
                    update={getAllProducts}
                  />
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        {tableData.length <= 0 && <AddProductComponent />}
      </PageWrapper>
    </Box>
  );
};

export default ProductsPage;
