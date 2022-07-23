import { useCart } from "../../context/cart/CartContext";

export const ProflieReduser = (profile, action) => {
  const { updateCartWithToken } = useCart();


  switch (action.type) {
    case "ADD_PROFILE":
      let time = new Date().getTime();
      localStorage.setItem("login-time", JSON.stringify(time));
     
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
