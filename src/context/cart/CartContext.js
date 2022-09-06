import { createContext, useState, useContext } from "react";
import { BASE_URL } from "../../api/BaseUrl";

import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // state for cart
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null
  );

  //update cartstate
  const updateCart = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    //get cart from backend and set in cart state
    axios
      .get(`${BASE_URL}/cart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) => {
        let cart = e.data.data.cart;
        setCart(cart);
      })
      .catch((e) => {
        console.log(e.response.data.reason);
      });
  };

  const addShopifyItemToCart = (item) => {
    if (cart == null || cart.length == 0) {
      let currentItems = [];
      currentItems.push(item);
      setCart(currentItems);
      localStorage.setItem("cart", JSON.stringify(currentItems));
    } else {
      let currentItems = [];
      if (item.shopName != cart[0].shopName) {
        currentItems.push(item);
      } else {
        for (let it of cart) currentItems.push(it);
        let find = currentItems.find(
          (current) => current.variant.id == item.variant.id
        );
        if (find == undefined) {
          currentItems.push(item);
        } else {
          currentItems = currentItems.map((current) => {
            if (current.variant.id == item.variant.id) {
              return { ...current, amount: current.amount + item.amount };
            } else {
              return { ...current };
            }
          });
        }
      }
      setCart(currentItems);
      localStorage.setItem("cart", JSON.stringify(currentItems));
    }
  };

  const deleteItemFromCart = (variantId) => {
    let currentItems = [];
    currentItems = cart.filter((currentItem) => {
      if (currentItem.variant.id != variantId) return currentItem;
    });
    setCart(currentItems);
    localStorage.setItem("cart", JSON.stringify(currentItems));
  };

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
  };

  const changeQuantity = (quantity, variantId) => {
    let currentCart = []
    for(let item of cart){
      currentCart.push(item)
    }

    currentCart = currentCart.map((item) => {
    
      if (item.variant.id == variantId) {
        return { ...item, amount: quantity };
      } else {
        return item;
      }
    });

    setCart(currentCart);
    localStorage.setItem("cart", JSON.stringify(currentCart));
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
