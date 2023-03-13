export const SHOP_REDUCER_TYPES = {
  CHANGE_WEBURL: "CHANGE_WEBURL",
  CHANGE_INSTAGRAM: "CHANGE_INSTAGRAM",
  CHANGE_TWITTER: "CHANGE_TWITTER",
  CHANGE_DISCORD: "CHANGE_DISCORD",
};

export function shopContactReducer(state, action) {
  switch (action.type) {
    case SHOP_REDUCER_TYPES.CHANGE_ADDRESS_BOOK:
      return { ...state, addressBookID: action.payload };
    case SHOP_REDUCER_TYPES.CHANGE_DESCRIPTION:
      return { ...state, description: action.payload };
    default:
      throw new Error();
  }
}
