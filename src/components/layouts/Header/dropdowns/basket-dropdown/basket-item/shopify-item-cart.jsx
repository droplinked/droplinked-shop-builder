import { Box, Text, Image, Spinner } from "@chakra-ui/react";
import { useState } from "react"
import { ReactComponent as CloseIcon } from '../../../../../../assest/icon/xmark.svg';

const ShopifyCartItem = ({ product, amount, variant }) => {
    const [loading, setLoading] = useState(false)
  console.log(product);
  console.log(amount);
  console.log(variant);
  return (
    <Box
      w="100%"
      h="80px"
      py="10px"
      borderBottom="1px"
      borderColor="white"
      display="flex"
      pos="relative"
    >
      <Image
        src={product.images[0].src}
        w="25%"
        h="100%"
        mr="10px"
        alt="Merch"
        cursor="pointer"
       // onClick={navigateToProductPage}
      />

      <Box
        w="75%"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box w="100%" maxW='100%' display="flex" justifyContent="space-between">
          <Text
            textAlign="start"
            fontSize="14px"
            color="white"
            fontWeight="600"
            cursor="pointer"
            overflow='hidden'
            whiteSpace='nowrap'
            maxW='60%'
            textOverflow='ellipsis'
           // onClick={navigateToProductPage}
          >
            {product.title}
          </Text>
          <Text
          w='auto'
            textAlign="center"
            fontSize="18px"
            color="white"
            fontWeight="500"
          >
            ${(variant.price)}
          </Text>
        </Box>

        <Box w="100%" display="flex" justifyContent="space-between">
          <Text
            textAlign="center"
            fontSize="12px"
            color="#ccc"
            fontWeight="500"
          >
            Quantity: {amount}
          </Text>
        </Box>
      </Box>
      <Box pos="absolute" w="20px" h="20px" right="0px" bottom="10px">
        {loading ? (
          <Spinner color="#e74c3c" w="100%" h="100%" />
        ) : (
          <CloseIcon
           // onClick={deleteItem}
            style={{
              fill: "#e74c3c",
              cursor: "pointer",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ShopifyCartItem;
