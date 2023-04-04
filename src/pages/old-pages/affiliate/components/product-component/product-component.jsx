import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductComponent = ({ product }) => {
  //console.log('product',product); 

  const navigate = useNavigate()

  const navigateToProduct = () => navigate('/affiliate/product/4578465442138754')
  
  return (
    <Box w="100%" h="100%" bg="mainLayer" borderRadius="8px" p="16px" onClick={navigateToProduct} cursor='pointer'>
      <Image src={product.image} w="100%" aspectRatio="1"/>
      <Box mb="16px"></Box>
      <Text fontSize={{ base:'8px' , md:"12px"}} fontWeight="500" color="lightGray">
        {product.name}
      </Text>
    </Box>
  );
};

export default ProductComponent;
