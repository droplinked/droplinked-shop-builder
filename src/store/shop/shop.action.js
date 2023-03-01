import SHOP_ACTION_TYPES from "./shop.types";
import { createAction } from "../reducer-utils";

export const setCurrentShop = (data) => {
  localStorage.setItem("shop", JSON.stringify(data));
 console.log('setCurrentShop ' ,data )
  return createAction(SHOP_ACTION_TYPES.SET_SHOP_DATA, data);
};
