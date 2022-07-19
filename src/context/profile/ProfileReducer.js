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
      localStorage.clear()
      return null;

    default:
      return profile;
  }
};
