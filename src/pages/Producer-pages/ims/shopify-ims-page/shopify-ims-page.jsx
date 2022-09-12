import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { importShopifyProducts } from "../../../../api/producer/Product-api";
import { useToasty } from "../../../../context/toastify/ToastContext";
import ShopifyProduct from "./shopify-product";

const ShopImsPage = ({ products, update }) => {
  const [domain, setDomain] = useState("");
  const [loading, setLoadig] = useState(false);

  const { successToast, errorToast } = useToasty();

  const importDomain = async () => {
    setLoadig(true);
    let result = await importShopifyProducts(domain);
    if (result == true) {
      successToast("Products added into the IMS");
      update();
    } else {
      errorToast(result);
    }
    setLoadig(false);
  };

  return (
    <Flex
      w="100%"
      justifyContent="center"
      flexDir="column"
      px={{ base: "0px", md: "80px" }}
      maxW="900px"
    >
      {products.length == 0 ? (
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
      ) : (
        <Flex w="100%" flexWrap="wrap">
          {products.map((product) => (
            <Box
              key={product._id}
              mt="40px"
              w={{ base: "100%", sm: "50%", md: "33%", lg: "25%" }}
            >
              <ShopifyProduct
                id={product._id}
                product_listing={product.shopifyData}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ShopImsPage;
