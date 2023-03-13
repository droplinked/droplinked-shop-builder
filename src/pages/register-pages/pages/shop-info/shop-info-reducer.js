export const SHOP_REDUCER_TYPES = {
    CHANGE_ADDRESS_BOOK: "CHANGE_ADDRESS_BOOK",
    CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
  };
  
  export function shopInformationReducer(state, action) {
    switch (action.type) {
      case SHOP_REDUCER_TYPES.CHANGE_ADDRESS_BOOK:
        return { ...state, addressBookID: action.payload };
      case SHOP_REDUCER_TYPES.CHANGE_DESCRIPTION:
        return { ...state, description: action.payload };
      default:
        throw new Error();
    }
  }
  