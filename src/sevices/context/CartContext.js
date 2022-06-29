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
        let cartArray = []
        let items = e.data.data.carts.map(cart => cart.items).filter(item => item.length > 0)

        items.forEach(element => {
          element.forEach(item =>{
            cartArray.push({skuID : item.skuID , quantity:item.quantity , id:item.productID})
          })
        });
        console.log(cartArray);
        setCart(cartArray);
      })
      .catch((e) => {
        console.log(e.response.data.reason)
      });
  };


  const firstUpdateCart = (tk) => {
    axios
      .get(`${BasicURL}/cart`,
      {headers: { Authorization: "Bearer " + tk }})
      .then((e) => {
        let cartArray = []
        let items = e.data.data.carts.map(cart => cart.items).filter(item => item.length > 0)

        items.forEach(element => {
          element.forEach(item =>{
            cartArray.push({skuID : item.skuID , quantity:item.quantity , id:item.productID})
          })
        });
        console.log(cartArray);
        setCart(cartArray);
      })
      .catch((e) => {
        console.log(e.response.data.reason)
      });
  };


  // const updateCartWithToken = (tok) => {
  //   axios
  //     .get(`${BasicURL}/cart`,
  //     {headers: { Authorization: "Bearer " + tok }})
  //     .then((e) => {
  //       let items = e.data.data.carts.map(cart => cart.items)
  //       console.log(items);
  //      // setCart(e.data.data.cart);
  //     })
  //     .catch((e) => {
  //       console.log(e.response.data.reason)
  //     });
  // };
  
  const contextValues = {
    updateCart,
    firstUpdateCart,
    cart,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
