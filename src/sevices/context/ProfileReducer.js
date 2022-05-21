export const ProflieReduser = (profile, action) => {
  switch (action.type) {
    case "ADD_PROFILE":
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...action.payload };

    case "LOGOUT":
      localStorage.setItem("profile", null);
      localStorage.setItem("shopping_cart", null);
      localStorage.setItem("checkout-createdCheckout", null);
      localStorage.setItem("checkout-customerId", null);
      localStorage.setItem("checkout-selectedShipping", null);
      localStorage.setItem("checkout-selectedAddress", null);
      localStorage.setItem("checkout-selectedCard", null);
      localStorage.setItem("token", null);
      return null;

    default:
      return profile;
  }
};
