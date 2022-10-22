import { Box, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteSkuFromCart } from "../../../../../../api/base-user/Cart-api";
import { useCart } from "../../../../../../context/cart/CartContext";
import { ReactComponent as CloseIcon } from "../../../../../../assest/icon/xmark.svg";
import { useToasty } from "../../../../../../context/toastify/ToastContext";
import {
  CartItemWrapper,
  ItemImage,
  ItemDetail,
  ItemTitle,
  ItemPrice,
  ItemQuantity,
  RowWrapper
} from "./cart-item-style";

export default function DroplinkedItem({ item, close }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateCart } = useCart();
  const { successToast, errorToast } = useToasty();

  //navigate to merch page after click on product
  const navigateToProductPage = () => {
    navigate(`${item.shopName}/merch/${item.product._id}`);
    close();
  };

  const deleteItem = async () => {
    setLoading(true);
    let result = await deleteSkuFromCart(item.skuID);
    if (result == true) {
      successToast("Item removed");
      updateCart();
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  return (
    <CartItemWrapper>
      <ItemImage src={item.product.media[0].url} />

      <ItemDetail>
        <RowWrapper >
          <ItemTitle onClick={navigateToProductPage}>
            {item.product.title}
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
          <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
          <ItemPrice>${item.totalPrice}</ItemPrice>
        </RowWrapper>
      </ItemDetail>
    </CartItemWrapper>
  );
}
