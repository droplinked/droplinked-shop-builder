import { Flex, Box, Text, Image } from "@chakra-ui/react";

const Item = ({ product }) => {
  let imgSrc = product.product.images[0].src;
  let productTitle = product.product.title;
  let variant = product.variant.title;
  let amount = product.amount;
  let totalPrice = (amount * parseFloat(product.variant.price)).toFixed(2);

  return (
    <Flex w="100%" bg="gray" borderRadius="8px" p="10px 20px" mb="10px">
      <Image src={imgSrc}
       w={{base:'60px' , md:'80px'}}
        h={{base:'60px' , md:'80px'}}
        borderRadius="8px" />
      <Flex ml="20px" justifyContent='space-between' w='100%'>
        <Box>
          <Text
            color="#fff"
            fontWeight="600"
            fontSize={{ base: "16px", md: "18px" }}
            mb='5px'
          >
            {productTitle} * {amount}
          </Text>
          <Text
            color="#ddd"
            fontWeight="500"
            fontSize={{ base: "12px", md: "14px" }}
          >
            {variant}
          </Text>
        </Box>
        <Flex h='100%' alignItems='center'>
        <Text
          color="#fff"
          fontWeight="600"
          fontSize={{ base: "16px", md: "22px" }}
        >
          ${totalPrice}
        </Text>
        </Flex>
        
      </Flex>
    </Flex>
  );
};

export default Item;
