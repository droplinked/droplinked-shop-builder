import SHOP_ACTION_TYPES from "./shop.types";
import { createAction } from "../reducer-utils";

export const setCurrentShop = (data) => {
  localStorage.setItem("shop", JSON.stringify(data));

  return createAction(SHOP_ACTION_TYPES.SET_SHOP_DATA, data);
};
