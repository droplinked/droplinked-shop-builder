import { Box, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../../../assest/icon/xmark.svg";
import { useCart } from "../../../../../../context/cart/CartContext";
import {
  CartItemWrapper,
  ItemImage,
  ItemDetail,
  ItemTitle,
  ItemPrice,
  ItemQuantity,
} from "./cart-item-style";

const ShopifyCartItem = ({ product, amount, variant }) => {
  const [loading, setLoading] = useState(false);
  const { deleteItemFromCart } = useCart();

  const removeFromCart = () => deleteItemFromCart(variant.id);

  return (
    <CartItemWrapper>
      <ItemImage
        src={product.images[0].src}
        // onClick={navigateToProductPage}
      />

      <ItemDetail>
        <Box w="100%" maxW="100%" display="flex" justifyContent="space-between">
          <ItemTitle
          // onClick={navigateToProductPage}
          >
            {product.title}
          </ItemTitle>
          <ItemPrice>${variant.price}</ItemPrice>
        </Box>

        <Box w="100%" display="flex" justifyContent="space-between">
          <ItemQuantity>Quantity: {amount}</ItemQuantity>
        </Box>
      </ItemDetail>
      <Box pos="absolute" w="20px" h="20px" right="0px" bottom="10px">
        <CloseIcon
          onClick={removeFromCart}
          style={{
            fill: "#e74c3c",
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </CartItemWrapper>
  );
};

export default ShopifyCartItem;
