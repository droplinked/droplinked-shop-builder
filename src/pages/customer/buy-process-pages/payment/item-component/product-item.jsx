import { Flex } from "@chakra-ui/react";
import {
  ProductWrapper,
  ProductTitle,
  VariantText,
} from "./product-item-style";
import { SHOP_TYPES } from "../../../../../constant/shop-types";

const ProductItem = ({ type, product }) => {
  let title = product.product.title;

  let variant =
    type == SHOP_TYPES.SHOPIFY
      ? product.variant.title
      :( product.sku.options[0] ? product.sku.options[0].value :'');

  let price =
    type == SHOP_TYPES.SHOPIFY
      ? parseFloat(product.variant.price).toFixed(2)
      : parseFloat(product.sku.price).toFixed(2);

  let amount = type == SHOP_TYPES.SHOPIFY ? product.amount : product.quantity;

  return (
    <ProductWrapper>
      {/* <Image src={imgSrc}
         w={{base:'60px' , md:'80px'}}
          h={{base:'60px' , md:'80px'}}
          borderRadius="8px" /> */}
      <ProductTitle>{title}</ProductTitle>

      <Flex justifyContent="space-between" w="100%">
        <VariantText>{variant}</VariantText>

        <VariantText>
          ${price} * {amount}
        </VariantText>
      </Flex>
    </ProductWrapper>
  );
};

export default ProductItem;
