import { createContext, useState, useEffect } from "react";
import { CartReducer, ItemCounter, totalPrice } from "./CartReducer";
import { BasicURL } from "../functoinal-service/CallApiService";
import { errorToast } from "./Toast-context"
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    
  const [cart, setCart] = useState(null);

  let token = JSON.parse(localStorage.getItem("token"));

  const updateCart = () => {
    axios
      .get(`${BasicURL}/cart`,
      {headers: { Authorization: "Bearer " + token }})
      .then((e) => {
        let items = e.data.data.carts.map(cart => cart.items)
        console.log(items);
       // setCart(e.data.data.cart);
      })
      .catch((e) => {
        console.log(e.response.data.reason)
      });
  };


  const updateCartWithToken = (tok) => {
    axios
      .get(`${BasicURL}/cart`,
      {headers: { Authorization: "Bearer " + tok }})
      .then((e) => {
        let items = e.data.data.carts.map(cart => cart.items)
        console.log(items);
       // setCart(e.data.data.cart);
      })
      .catch((e) => {
        console.log(e.response.data.reason)
      });
  };
  
  const contextValues = {
    updateCart,
    updateCartWithToken,
    cart,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
