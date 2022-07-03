import { createContext, useState, useEffect } from "react";
import { CartReducer, ItemCounter, totalPrice } from "./CartReducer";
import { BasicURL } from "../functoinal-service/CallApiService";
import { errorToast } from "./Toast-context";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState(null);

  let token = JSON.parse(localStorage.getItem("token"));

  //update cartstate
  const updateCart = () => {
    //first get cart from back
    axios
      .get(`${BasicURL}/cart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(async (e) => {
        let cart = e.data.data.cart;

        //build array of productIDs
        let productsId = cart.items.map((item) => item.productID);
        //send array of productIDs and get array of Products
        let productsArray = await getProductData(productsId);

        // build new cartitems with productsArray
        let newCartItems = cart.items.map((item) => {
          let Product = productsArray.find((p) => p._id == item.productID)
          return {...item , Product}
        });

        setCart({
          id:cart._id,
          status:cart.status,
          items:newCartItems
        })
      })
      .catch((e) => {
        console.log(e.response.data.reason);
      });
  };

  // return data of products in cart from backend
  const getProductData = async (cartItems) => {
    let promises = [];
    for (let i = 0; i < cartItems.length; i++) {
      promises.push(axios.get(`${BasicURL}/product/${cartItems[i]}`));
    }
    let results = await Promise.all(promises);
    results = results.map((e) => e.data.data);

    return results;
  };

  

  // firts update when we havent token
  const firstUpdateCart = (tk) => {
    axios
      .get(`${BasicURL}/cart`, {
        headers: { Authorization: "Bearer " + tk },
      })
      .then(async (e) => {
        let cart = e.data.data.cart;

        //get productsID for get product data from backend
        let productsId = cart.items.map((item) => item.productID);
        //get products by productsID
        let productsArray = await getProductData(productsId);

        // build new cartitems with productsArray
        let newCartItems = cart.items.map((item) => {
          let Product = productsArray.find((p) => p._id == item.productID)
          return {...item , Product}
        });

        setCart({
          id:cart._id,
          status:cart.status,
          items:newCartItems
        })
      })
      .catch((e) => {
        console.log(e.response.data.reason);
      });
  };

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

// axios
//   .get(`${BasicURL}/product/${productID}`)
//   .then((e) => {
//     let lastCart = [];

//     if (cart == null) {
//       lastCart.push({
//         shop: shop,
//         items: [{ product: e.data.data, skuID: skuID, quantity: quantity }],
//       });
//       console.log("true");
//     } else {
//       console.log("false");
//       for (let c of cart) lastCart.push(c);

//       lastCart.forEach((item, i) => {
//         console.log(item.shop._id == shop._id);
//         if (item.shop._id == shop._id) {
//           let newItems = lastCart[i].items;
//           newItems.push({
//             product: e.data.data,
//             skuID: skuID,
//             quantity: quantity,
//           });
//           console.log(lastCart[i].items);
//           lastCart[i].items = newItems;
//         } else {
//           lastCart.push({
//             shop: shop,
//             items: [
//               { product: e.data.data, skuID: skuID, quantity: quantity },
//             ],
//           });
//         }
//       });
//     }
//     setCart(lastCart);
//   })
//   .catch((e) => {
//     console.log(e.response.data.reason);
//   });
