import SHOP_ACTION_TYPES from "./shop.types";

export const SHOP_INITIAL_STATE = {
  currentShop: JSON.parse(localStorage.getItem("shop")) || null,
};

export const shopReducer = (state = SHOP_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SHOP_ACTION_TYPES.SET_SHOP_DATA:
      return { ...state, currentShop: payload };
    default:
      return state;
  }
};
