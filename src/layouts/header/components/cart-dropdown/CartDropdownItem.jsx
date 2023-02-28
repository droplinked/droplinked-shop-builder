import { Box, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { deleteSkuFromCart } from "../../../../api/base-user/Cart-api";
import { useCart } from "../../../../context/cart/CartContext";
import { ReactComponent as CloseIcon } from "../../../../assest/icon/xmark.svg";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { SHOP_TYPES } from "../../../../constant/shop-types";
import {
  CartItemWrapper,
  ItemImage,
  ItemDetail,
  ItemTitle,
  ItemPrice,
  ItemQuantity,
  RowWrapper,
} from "./CartDropdownItem-style";

export default function CartDropdownItem({ type, product, close }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateCart ,deleteItemFromCart } = useCart();
  const { successToast, errorToast } = useToasty();


  const getImageUrl = () => {
    if (type == SHOP_TYPES.DROPLINKED) return product.product.media[0].url;
    else return product.product.images[0].src;
  };

  const getQuantity = () => {
    if (type == SHOP_TYPES.DROPLINKED) return product.quantity;
    else return product.amount;
  };

  const getPrice = () => {
    if (type == SHOP_TYPES.DROPLINKED)
      return parseFloat(product.totalPrice).toFixed(2);
    else return product.variant.price;
  };

  //navigate to merch page after click on product
  const navigateToProductPage = () => {
    if (type == SHOP_TYPES.DROPLINKED) {
      navigate(`${product.shopName}/merch/${product.product._id}`);
      close();
    }
  };

  const deleteItem = async () => {
    if (type == SHOP_TYPES.DROPLINKED) {
      setLoading(true);
      let result = await deleteSkuFromCart(product.skuID);
      if (result == true) {
        successToast("Item removed");
        updateCart();
      } else {
        errorToast(result);
      }
      setLoading(false);
    }else{
        deleteItemFromCart(product.variant.id);
    }
  };

  return (
    <CartItemWrapper>
      <ItemImage src={getImageUrl()} />

      <ItemDetail>
        <RowWrapper>
          <ItemTitle onClick={navigateToProductPage}>
            {product.product.title}
          </ItemTitle>
          <Box w="20px" h="20px">
            {loading ? (
              <Spinner color="#e74c3c" w="100%" h="100%" />
            ) : (
              <CloseIcon
                onClick={deleteItem}
                style={{
                  fill: "#e74c3c",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </Box>
        </RowWrapper>

        <RowWrapper>
          <ItemQuantity>Quantity: {getQuantity()}</ItemQuantity>
          <ItemPrice>${getPrice()}</ItemPrice>
        </RowWrapper>
      </ItemDetail>
    </CartItemWrapper>
  );
}
