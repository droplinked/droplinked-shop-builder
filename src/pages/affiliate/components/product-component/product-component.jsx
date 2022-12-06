import { Box, Flex, Image, Text } from "@chakra-ui/react";

const ProductComponent = ({ product }) => {
  //console.log('product',product);
  return (
    <Box w="100%" h="100%" bg="mainLayer" borderRadius="8px" p="16px">
      <Image src={product.image} w="100%" aspectRatio="1" />
      <Box mb="16px"></Box>
      <Text fontSize={{ base:'8px' , md:"12px"}} fontWeight="500" color="lightGray">
        {product.name}
      </Text>
    </Box>
  );
};

export default ProductComponent;

// sm: '30em',
// md: '48em',
// lg: '62em',
// xl: '80em',
