import { Text, Flex, Image } from "@chakra-ui/react";
import { SHOP_TYPES } from "../../../constant/shop-types";

export default function OrderMerch({ item, type }) {
  // style for variant and quantity and price text
  const textStyel = {
    color: "#ddd",
    fontWeight: "500",
  };

  const imageUrl =
    type != SHOP_TYPES.SHOPIFY ? item.product.media[0].url : item.image_url;

  // const merchPrice = (type != SHOP_TYPES.SHOPIFY)? item.sku.price : item.price

  const merchPrice = item.totalPriceItemByDiscount
    ? item.totalPriceItemByDiscount
    : item.totalPriceItem;
  // const getVariantText = () => {
  //     if(item.sku.options.length == 0) return ''
  //     let variantText = ' '

  //     item.sku.options.forEach(option => {
  //              let variantName = (option.variantID == "62a989ab1f2c2bbc5b1e7153" ? "Size" : "Color")
  //              variantText += `${variantName}: ${option.value}\xa0\xa0\xa0\xa0\xa0\xa0`
  //          })
  //          return variantText
  // }

  //  const Totalprice = parseFloat(item.quantity * item.sku.price)

  const Totalprice = parseInt(item.quantity) * parseFloat(item.price);

  return (
    <Flex
      borderBottom="1px"
      borderColor="white"
      pb="5px"
      h={{ base: "50px", md: "70px" }}
    >
      <Image
        src={imageUrl}
        objectFit="cover"
        w={{ base: "45px", md: "65px" }}
        h={{ base: "45px", md: "65px" }}
        mr="15px"
      />

      <Flex flexDirection="column" w="100%" justifyContent="space-between">
        <Text
          color="white"
          fontSize={{ base: "16px", md: "20px" }}
          fontWeight="600"
          overflow="hidden"
        >
          {/* {item.title} */}
          {item.product.title}
        </Text>
        <Flex w="100%" justifyContent="space-between">
          {/* <Text style={textStyel} w='55%' fontSize={{base:'8px' , sm: "10px", md: "14px" }} >{getVariantText()}</Text>  */}
          <Text
            style={textStyel}
            w="30%"
            fontSize={{ base: "8px", sm: "10px", md: "14px" }}
          >
            {" "}
            Quantity: {item.quantity}
          </Text>
          <Text
            style={textStyel}
            textAlign="end"
            w="15%"
            fontSize={{ base: "8px", sm: "10px", md: "14px" }}
          >
            ${merchPrice}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
