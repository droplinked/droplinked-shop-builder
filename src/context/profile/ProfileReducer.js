import { useCart } from "../../context/cart/CartContext";

export const ProflieReduser = (profile, action) => {
  const { updateCartWithToken } = useCart();


  switch (action.type) {
    case "ADD_PROFILE":
      localStorage.setItem("token", JSON.stringify(action.payload.jwt));
      localStorage.setItem("profile", JSON.stringify(action.payload.user));
      return { ...action.payload.user };

    case "UPDATE_PROFILE":
      let newProfile = {...profile , ...action.payload }
      localStorage.setItem("profile", JSON.stringify(newProfile));
      return newProfile;

    case "LOGOUT":
      localStorage.setItem("profile", null);
      localStorage.setItem("shopping_cart", null);
      localStorage.setItem("checkout-createdCheckout", null);
      localStorage.setItem("checkout-customerId", null);
      localStorage.setItem("checkout-selectedShipping", null);
      localStorage.setItem("checkout-selectedAddress", null);
      localStorage.setItem("checkout-selectedCard", null);
      localStorage.setItem("token", null);
      localStorage.setItem("registerEmail", null);
      return null;

    default:
      return profile;
  }
};
