import { Tr, Td, Image, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../../../../hooks/useProfile/useProfile";

const ProductCompnent = ({ product }) => {
  
  const navigate = useNavigate();
  const { shop } = useProfile();

  const clickOnProduct = () => navigate(`/${shop.name}/product/${product._id}`);

  return (
    <Tr cursor="pointer" onClick={clickOnProduct}>
      <Td>
        <Flex alignItems="start" gap="12px">
          <Image src={product.media[0].url} w="48px" h="48px" />
          <Text
            fontFamily="Avenir Next"
            fontWeight="500"
            fontSize="12px"
            color="#C2C2C2"
          >
            {product.title}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="12px"
          color="#C2C2C2"
        >
          {product.productCollectionID.title}
        </Text>
      </Td>
      <Td>
        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="12px"
          color="#C2C2C2"
        >
          No status
        </Text>
      </Td>
      <Td>
        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="12px"
          color="#C2C2C2"
        >
          -
        </Text>
      </Td>
    </Tr>
  );
};

export default ProductCompnent;
