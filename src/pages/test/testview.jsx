import {
  Text,
  Flex,
  Box,
  AspectRatio,
  Image,
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
import { useState, useEffect } from "react";
import { getCollections } from "../../api/producer/Collection-api";

import axios from "axios";
import Dropdown from "../../components/shared/Dropdown/Dropdown-component";

const TextView = () => {
  const [product, setProduct] = useState(null);
  const [collectionList, setCollection] = useState([]);
  useEffect(() => {
    axios
      .post(
        "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
        {
          page: 1,
          shop_domain: "crashpunks-gear.myshopify.com",
          keyword: "",
        }
      )
      .then((response) => {
        let x = response.data.shopify.map((item) => item.product_listing);
        setProduct(x[0]);
      });
    initialCollection();
  }, []);

  const initialCollection = async () => {
    let result = await getCollections();
    if (result != null) {
      let collections = result.map((col) => {
        return { id: col._id, value: col.title };
      });
      setCollection(collections);
    }
  };


  return (
    <Flex
      w="100%"
      justifyContent="center"
      maxW="900px"
      flexDir="column"
      mx="auto"
      px={{ base: "20px", md: "80px" }}
    >
      {product && (
        <>
          <Text
            color="#fff"
            fontWeight="600"
            fontSize={{ base: "16px", md: "20px" }}
            mb="30px"
          >
            {product.title}
          </Text>
          <Box w={{ base: "100%", md: "50%" }} mb="30px" mx="auto">
            {collectionList.length > 0 && (
              <Dropdown
                pairArray={collectionList}
                placeholder={"Choose collection"}
              />
            )}
          </Box>
          <Text
            color="#fff"
            fontWeight="500"
            fontSize={{ base: "14px", md: "16px" }}
            mb="30px"
            dangerouslySetInnerHTML={{ __html: product.body_html }}
          ></Text>

          <Flex w="100%" wrap="wrap" my="20px">
            {product.images.map((img) => {
              return (
                <Box w={{ base: "100%", sm: "50%", md: "25%" }} p="5px">
                  <AspectRatio ratio={1}>
                    <Image src={img.src} alt="test" borderRadius="8px" />
                  </AspectRatio>
                </Box>
              );
            })}
          </Flex>

          <TableContainer>
            <Table>
              <Thead color="red">
                <Tr>
                  {product.options.map((option) => (
                    <Th>{option.name}</Th>
                  ))}
                  <Th>Sku</Th>
                  <Th>Quantitu</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {product.variants.map((variant) => {
                  return (
                    <Tr>
                      <Td color="#8054ff" fontWeight="600">
                        {variant.option_values[0].value}
                      </Td>
                      <Td color="#8054ff" fontWeight="600">
                        {variant.sku}
                      </Td>
                      <Td color="#8054ff" fontWeight="600">
                        {variant.inventory_quantity}
                      </Td>
                      <Td color="#8054ff" fontWeight="600">
                        ${variant.price}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Flex>
  );
};

export default TextView;
