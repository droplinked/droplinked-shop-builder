import { useCart } from "../../../../../context/cart/CartContext";
import { CartIconWrapper, IconImage } from "./cart-icon-style";

import cartIcon from "../../../../../assest/icon/shopCart.svg";
import activeCartIcon from "../../../../../assest/icon/activeShopCart.svg";

export default function Cart({ clickBasket }) {
  const { cart } = useCart();

  return (
    <CartIconWrapper onClick={clickBasket}>
      {cart != null && cart.items.length > 0 ? (
        <IconImage src={activeCartIcon} />
      ) : (
        <IconImage src={cartIcon} fill="red" />
      )}
    </CartIconWrapper>
  );
}
