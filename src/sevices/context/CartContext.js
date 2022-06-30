import { createContext, useState, useEffect } from "react";
import { CartReducer, ItemCounter, totalPrice } from "./CartReducer";
import { BasicURL } from "../functoinal-service/CallApiService";
import { errorToast } from "./Toast-context";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  let token = JSON.parse(localStorage.getItem("token"));

  //get Cart from back
  const updateCart = () => {
    axios
      .get(`${BasicURL}/cart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) => {
        let carts = e.data.data.carts;
        let cartItems = [];
        carts.forEach((cart) => {
          if (cart.items.length > 0) {
            cart.items.forEach((item) => {
              cartItems.push({
                productID: item.productID,
                skuID: item.skuID,
                quantity: item.quantity,
                shopID: cart.shopID,
              });
            });
          }
        });
        getProductData(cartItems);
      })
      .catch((e) => {
        console.log(e.response.data.reason);
      });
  };

  // get product of cart from back
  const getProductData = (cartItems) => {
    let promises = [];
    for (let i = 0; i < cartItems.length; i++) {
      promises.push(axios.get(`${BasicURL}/product/${cartItems[i].productID}`));
    }
    Promise.all(promises)
      .then((e) => {
        let products = e.map((p) => p.data.data);
        getValueTOCart(products, cartItems);
      })
      .catch((e) => console.log(e.response));
  };

// build new array by cart and products
  const getValueTOCart = (products, cart) => {
    let resultArray = cart.map(item => {

     let findProduct = products.find(product => product._id == item.productID)
     let price =  findProduct.skus.find(sku => sku._id == item.skuID).price

     return {...item , product:findProduct , price:price}
    })
    setCart(resultArray);
  };



  // firts update when we havent token
  const firstUpdateCart = (tk) => {
    axios
    .get(`${BasicURL}/cart`, {
      headers: { Authorization: "Bearer " + tk },
    })
    .then((e) => {
      let carts = e.data.data.carts;
      let cartItems = [];
      carts.forEach((cart) => {
        if (cart.items.length > 0) {
          cart.items.forEach((item) => {
            cartItems.push({
              productID: item.productID,
              skuID: item.skuID,
              quantity: item.quantity,
              shopID: cart.shopID,
            });
          });
        }
      });
      getProductData(cartItems);
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
