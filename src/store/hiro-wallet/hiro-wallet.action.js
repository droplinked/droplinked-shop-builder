import HIRO_WALLET_ACTION_TYPES from "./hiro-wallet.types";
import { createAction } from "../reducer-utils";

export const setCurrentHiroWallet = (data) => {
  return createAction(HIRO_WALLET_ACTION_TYPES.SET_HIRO_WALLET, data);
};
