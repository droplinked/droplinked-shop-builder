import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Spinner,
  Box
} from "@chakra-ui/react";
import { useState } from "react";

import ShopifyProduct from "./shopify-product"
import axios from "axios";

const ShopImsPage = () => {
  const [products, setProducts] = useState(null);
  const [domain, setDomain] = useState("");
  const [loading, setLoadig] = useState(false);
  // shop_domain: "crashpunks-gear.myshopify.com",

  const importDomain = () => {
    setLoadig(true);
    axios
      .post(
        "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
        {
          page: 1,
          shop_domain: domain,
          keyword: "",
        }
      )
      .then((response) => {
        let x = response.data.shopify.map((item) => item);
        setProducts(x);
        setLoadig(false);
      });
  };


  return (
    <Flex
      w="100%"
      justifyContent="center"
      flexDir="column"
      px={{ base: "0px", md: "80px" }}
      maxW="900px"
    >
      {/* xxxx */}
      {products == null ? (
        <InputGroup
          mt="40px"
          mx="auto"
          size="md"
          maxW={{ base: "auto", md: "350px" }}
        >
          <Input
            pr="4.5rem"
            placeholder="Shopify domain"
            border="2px solid"
            _focus={{ borderColor: "#8053ff" }}
            onChange={(e) => setDomain(e.target.value)}
            value={domain}
            color="#fff"
          />
          <InputRightElement width="5rem">
            <Button
              h="1.75rem"
              size="sm"
              bgColor="#8053ff"
              color="#fff"
              onClick={importDomain}
            >
              {loading == false ? "Import" : <Spinner />}
            </Button>
          </InputRightElement>
        </InputGroup>
      )
    :
    <Flex w='100%' flexWrap='wrap'>
    {products.map(product => 
     <Box w={{base:"100%" , sm:'50%' , md:'33%' ,lg:'25%'}}>
    <ShopifyProduct product_listing={product.product_listing}/>
    </Box>
    )} 
    </Flex>
    }
      {/* xxxx */}
    </Flex>
  );
};

export default ShopImsPage;
