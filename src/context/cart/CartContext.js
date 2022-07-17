import { createContext, useState ,useContext } from "react";
import { BASE_URL } from "../../api/BaseUrl"
import { errorToast } from "../../context/toastify/ToastContext";
import axios from "axios";


export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  let token = JSON.parse(localStorage.getItem("token"));

  //update cartstate
  const updateCart = () => {
    //first get cart from back
    axios
      .get(`${BASE_URL}/cart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(async (e) => {
        let cart = e.data.data.cart;
        
        //build array of productIDs
        let productsId = cart.items.map((item) => item.productID);
        //send array of productIDs and get array of Products
        let productsArray = await getProductData(productsId);

        // build new cartitems with productsArray and price
        let newCartItems = cart.items.map((item) => {
          let Product = productsArray.find((p) => p._id == item.productID);
          let price = Product.skus.find(sku => sku._id ==  item.skuID).price
     
          return { ...item, Product , price:price };
        });

        setCart({
          id: cart._id,
          status: cart.status,
          items: newCartItems,
        });

      })
      .catch((e) => {
        console.log(e.response.data.reason);
      });
  };

  // return data of products in cart from backend
  const getProductData = async (cartItems) => {
    let promises = [];
    for (let i = 0; i < cartItems.length; i++) {
      promises.push(axios.get(`${BASE_URL}/product/${cartItems[i]}`));
    }
    let results = await Promise.all(promises);
    results = results.map((e) => e.data.data);

    return results;
  };

  // firts update when we havent token
  const firstUpdateCart = (tk) => {
    axios
      .get(`${BASE_URL}/cart`, {
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
          let Product = productsArray.find((p) => p._id == item.productID);
          return { ...item, Product };
        });

        setCart({
          id: cart._id,
          status: cart.status,
          items: newCartItems,
        });
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




export const useCart = () => {
   
    const ctx = useContext(CartContext)

    return {
        ...ctx
    }
}

export default CartContextProvider;

