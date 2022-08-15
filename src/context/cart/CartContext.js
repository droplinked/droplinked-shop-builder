import { createContext, useState, useContext } from "react";
import { BASE_URL } from "../../api/BaseUrl";

import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // state for cart 
  const [cart, setCart] = useState(null);

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

  const contextValues = {
    updateCart,
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

export default CartContextProvider;
