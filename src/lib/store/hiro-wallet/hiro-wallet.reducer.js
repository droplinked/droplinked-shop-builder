import HIRO_WALLET_ACTION_TYPES from "./hiro-wallet.types";

export const HIRO_WALLET_INITIAL_STATE = {
  currentHiroWallet: null
};

export const hirowalletReducer = (state = HIRO_WALLET_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case HIRO_WALLET_ACTION_TYPES.SET_HIRO_WALLET:
      return { ...state, currentHiroWallet: payload };
    default:
      return state;
  }
};
