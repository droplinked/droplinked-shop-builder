import { createContext, useState, useEffect } from "react";
import { CartReducer, ItemCounter, totalPrice } from "./CartReducer";
import { useLocation } from "react-router-dom";
import { BasicURL } from "../functoinal-service/CallApiService";
import { errorToast } from "./Toast-context"
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    
  const [cart, setCart] = useState(null);

  let token = JSON.parse(localStorage.getItem("token"));
  let location = useLocation();

  useEffect(()=>{
     let url = location.pathname.split("/")
     if(url[1]!="" && url[1] == "shop") updateCart(url[2]);
  },[location])

  const updateCart = (shopname) => {
    axios
      .get(`${BasicURL}/${shopname}/cart`,
      {headers: { Authorization: "Bearer " + token }})
      .then((e) => {
        setCart(e.data.data.cart);
      })
      .catch((e) => {
        console.log(e.response.data.reason)
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

export default CartContextProvider;
