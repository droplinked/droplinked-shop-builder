import { combineReducers } from "redux";

import { profileReducer } from "./profile/profile.reducer";
import { shopReducer } from "./shop/shop.reducer";
import { hirowalletReducer } from "./hiro-wallet/hiro-wallet.reducer";
import { collectionSlice } from "./features/product/collection";

export const rootReducer = combineReducers({
  profile: profileReducer,
  shop: shopReducer,
  hiroWallet: hirowalletReducer,
  products: combineReducers({
    collection: collectionSlice.reducer
  })
});
