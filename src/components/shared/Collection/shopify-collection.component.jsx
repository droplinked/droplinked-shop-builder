import { Flex, Text, Box, AspectRatio, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
const ShopifyCollection = ({ product, id, shopname }) => {
  console.log(product);

  return (
    <Box w="100%" m="0px 0px 10px 0px" p="5px">
      <Link to={`/${shopname}/merch/${id}`}>
        <Box
          w="100%"
          h="auto"
          overflow="hidden"
          borderRadius="12px"
          cursor="pointer"
          pos="relative"
          p="0px"
          m="0px"
        >
          <AspectRatio ratio={1}>
            <Image
              w="100%"
              h="100%"
              src={product.images.length > 0  && product.images[0].src}
              _hover={{
                opacity: "0.6",
                transform: "scale(1.2)",
                transition: "all 2s ease-out",
              }}
            />
          </AspectRatio>
        </Box>
        <Text
          fontWeight="500"
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          color="#fff"
          mt="12px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {product.title}
        </Text>
      </Link>
    </Box>
  );
};

export default ShopifyCollection;
