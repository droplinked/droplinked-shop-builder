import { Flex, Box, Text, Image } from "@chakra-ui/react";

const Item = ({ product }) => {
  let imgSrc = product.product.images[0].src;
  let productTitle = product.product.title;
  let variant = product.variant.title;
  let amount = product.amount;
  let price = parseFloat(product.variant.price).toFixed(2);

  return (
    <Box w="100%" mb="13px" borderBottom='1px solid #757575'>
      {/* <Image src={imgSrc}
       w={{base:'60px' , md:'80px'}}
        h={{base:'60px' , md:'80px'}}
        borderRadius="8px" /> */}
      <Text
        color="#fff"
        fontWeight="500"
        fontSize={{ base: "18px", md: "24px" }}
        mb="7px"
        w="100%"
      >
        {productTitle}
      </Text>

      <Flex justifyContent="space-between" w="100%">
        <Text
          color="#fff"
          fontWeight="400"
          fontSize={{ base: "16px", md: "20px" }}
        >
          {variant}
        </Text>

        <Text
          color="#fff"
          fontWeight="400"
          fontSize={{ base: "16px", md: "20px" }}
        >
          ${price} * {amount}
        </Text>
      </Flex>
    </Box>
  );
};

export default Item;
