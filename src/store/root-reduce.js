import { combineReducers } from "redux";

import { profileReducer } from "./profile/profile.reducer";
import { shopReducer } from "./shop/shop.reducer";

export const rootReducer = combineReducers({
  profile: profileReducer,
  shop: shopReducer,
});
