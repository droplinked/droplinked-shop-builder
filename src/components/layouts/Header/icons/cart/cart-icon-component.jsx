import { useCart } from "../../../../../context/cart/CartContext";
import { CartIconWrapper, IconImage, ItemCounter } from "./cart-icon-style";
import { SHOP_TYPES } from "../../../../../constant/shop-types";
import cartIcon from "../../../../../assest/icon/shopCart.svg";
import activeCartIcon from "../../../../../assest/icon/activeShopCart.svg";

export default function Cart({ clickBasket }) {

  const { cart } = useCart();


  const getQuantity = () => {

    let total = 0;

    cart.items.forEach((item) => {
      if (cart.type == SHOP_TYPES.SHOPIFY) total += item.amount;
      else total += item.quantity;
    });
    return total

  };

  return (
    <CartIconWrapper onClick={clickBasket}>
      {cart != null && cart.items.length > 0 ? (
        <>
          <IconImage src={activeCartIcon} />
          <ItemCounter>{getQuantity()}</ItemCounter>
        </>
      ) : (
        <IconImage src={cartIcon} fill="red" />
      )}
    </CartIconWrapper>
  );
}
