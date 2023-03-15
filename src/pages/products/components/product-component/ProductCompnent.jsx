import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";

const ProductCompnent = ({ product }) => {
  console.log("pro ", product);
  return (
    <Tr cursor='pointer'>
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
