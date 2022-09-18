import { createContext, useState, useContext } from "react";
import { removeCart, getCart } from "../../api/base-user/Cart-api";
import { SHOP_TYPES } from "../../constant/shop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // state for cart
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null
  );

  //update cartstate
  const updateCart = async () => {
    let result = await getCart();
    if (result.status === "success") {
      let newCart = { ...result.data.cart, type: SHOP_TYPES.DROPLINKED };
      if (newCart.items.length > 0) setCart(newCart);
      else setCart(JSON.parse(localStorage.getItem("cart")) || null)
    } else {
      console.log(result.data.reason);
    }
  };

  const addShopifyItemToCart = (item) => {
    let newCart;
    // build new cart if doesnt exist any p
    if (cart == null) {
      newCart = { type: SHOP_TYPES.SHOPIFY, items: [item] };
    } else {
      // remove last cart if has item of droplinked type
      if (cart.type == SHOP_TYPES.DROPLINKED) {
        removeCart();
        newCart = { type: SHOP_TYPES.SHOPIFY, items: [item] };
      } else {
        // check new and old items shop
        let isSameShop = cart.items[0].shopName == item.shopName ? true : false;
        // if item from current shop add to cart
        if (isSameShop) {
          let existVariant = cart.items.find(
            (currentItem) => currentItem.variant.id == item.variant.id
          );
          // if item exist in cart only increase quantity
          if (existVariant != undefined) {
            let newItems = cart.items.map((currentItem) => {
              if (currentItem.variant.id == item.variant.id) {
                return {
                  ...currentItem,
                  amount: currentItem.amount + item.amount,
                };
              } else {
                return currentItem;
              }
            });
            newCart = { ...cart, items: newItems };
          } else {
            // add item with new variant
            let newItems = [];
            cart.items.forEach((currentItem) => newItems.push(currentItem));
            newItems.push(item);
            newCart = { ...cart, items: newItems };
          }
        } // if item be from new shop  build new cart
        else {
          newCart = { ...cart, items: [item] };
        }
      }
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const deleteItemFromCart = (variantId) => {
    let currentItems = [];
    currentItems = cart.items.filter((currentItem) => {
      if (currentItem.variant.id != variantId) return currentItem;
    });
    let newCart 
    if(currentItems.length == 0 )newCart=null
    else newCart = {...cart ,items:currentItems}
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    let newCart = {items:[]}
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const changeQuantity = (quantity, variantId) => {
    let currentCart = [];
    for (let item of cart.items) {
      currentCart.push(item);
    }

    currentCart = currentCart.map((item) => {
      if (item.variant.id == variantId) {
        return { ...item, amount: quantity };
      } else {
        return item;
      }
    });
    let newCart = {...cart , items:currentCart}
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const contextValues = {
    updateCart,
    addShopifyItemToCart,
    deleteItemFromCart,
    clearCart,
    changeQuantity,
    cart,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

// hook for use cart context
export const useCart = () => {
  const ctx = useContext(CartContext);
  return {
    ...ctx,
  };
};

export default CartProvider;
