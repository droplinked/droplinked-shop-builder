import { Box } from "@chakra-ui/react";
import { ReactComponent as CloseIcon } from "../../../../../../assest/icon/xmark.svg";
import { useCart } from "../../../../../../context/cart/CartContext";
import {
  CartItemWrapper,
  ItemImage,
  ItemDetail,
  ItemTitle,
  ItemPrice,
  ItemQuantity,
  RowWrapper,
} from "./cart-item-style";

const ShopifyCartItem = ({ product, amount, variant }) => {
  const { deleteItemFromCart } = useCart();

  const removeFromCart = () => deleteItemFromCart(variant.id);

  return (
    <CartItemWrapper>
      <ItemImage src={product.images[0].src} />

      <ItemDetail>
        <RowWrapper>
          <ItemTitle>{product.title}</ItemTitle>
          <Box w="20px" h="20px">
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
        </RowWrapper>

        <RowWrapper>
          <ItemQuantity>Quantity: {amount}</ItemQuantity>
          <ItemPrice>${variant.price}</ItemPrice>
        </RowWrapper>
      </ItemDetail>
    </CartItemWrapper>
  );
};

export default ShopifyCartItem;
