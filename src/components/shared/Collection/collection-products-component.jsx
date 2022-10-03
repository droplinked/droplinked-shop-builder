import { Flex, Text, Box } from "@chakra-ui/react";
import { SHOP_TYPES } from "../../../constant/shop-types";
import { USER_TYPE } from "../../../constant/user-types"

import Product from "../Product/Product";

const CollectionProducts = ({ products ,shopname , type }) => {
  return (
    <>
      {products.length > 0 ? (
        <Flex w="100%" wrap="wrap">
          {products.map((product, i) => {
            if (i < 4) {
              return (
                <Box key={i} w={{ base: "50%", md: "50%" , lg:'25%' }} p="3px">
                  {type == SHOP_TYPES.SHOPIFY ? (
                    <Product
                      shopname={shopname}
                      id={product._id}
                      title={product.shopifyData.title}
                      imageUrl={
                        product.shopifyData.images.length > 0 &&
                        product.shopifyData.images[0].src
                      }
                      type={USER_TYPE.CUSTOMER}
                    />
                  ) : (
                    <Product
                      title={product.title}
                      imageUrl={product.media[0].url}
                      id={product._id}
                      shopname={shopname}
                      type={USER_TYPE.CUSTOMER}
                    />
                  )}
                </Box>
              );
            }
          })}
        </Flex>
      ) : (
        <Text
          color="#fff"
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight="600"
          w="100%"
          textAlign="center"
          mt="30px"
        >
          Empty
        </Text>
      )}
    </>
  );
};

export default CollectionProducts;
