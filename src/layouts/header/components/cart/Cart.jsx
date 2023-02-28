import { useCart } from "../../../../context/cart/CartContext";
import { SHOP_TYPES } from "../../../../constant/shop-types";
import { CartIconWrapper, IconImage, ItemCounter } from "./Card-style";
import { useState } from "react";

import CartDropdown from "../cart-dropdown/CartDropdown";
import cartIcon from "../../../../assest/icon/card-icon.svg";

export default function Cart() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { cart } = useCart();

  const toggleDropdown = () => setShowDropdown((p) => !p);

  const getQuantity = () => {
    let total = 0;

    cart.items.forEach((item) => {
      if (cart.type == SHOP_TYPES.SHOPIFY) total += item.amount;
      else total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <CartIconWrapper onClick={toggleDropdown}>
        <IconImage src={cartIcon} />
        {cart != null && cart.items.length > 0 && (
          <ItemCounter>{getQuantity()}</ItemCounter>
        )}
      </CartIconWrapper>
      <CartDropdown show={showDropdown} close={toggleDropdown} />
    </>
  );
}
