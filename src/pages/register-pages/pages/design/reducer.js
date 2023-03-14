export const SHOP_REDUCER_TYPES = {
  SET_LOGO: "SET_LOGO",
  SET_HEADER_ICON: "SET_HEADER_ICON",
  SET_BACKGROUNED_TEXT: "SET_BACKGROUNED_TEXT",
  SET_BACKGROUNED_BANNER: "SET_BACKGROUNED_BANNER",
  SET_THEME: "SET_THEME",
};

export function shopDesignReducer(state, action) {
  switch (action.type) {
    case SHOP_REDUCER_TYPES.SET_LOGO:
      return { ...state, logo: action.payload };
    case SHOP_REDUCER_TYPES.SET_HEADER_ICON:
      return { ...state, headerIcon: action.payload };
    case SHOP_REDUCER_TYPES.SET_BACKGROUNED_TEXT:
      return { ...state, backgroundText: action.payload };
    case SHOP_REDUCER_TYPES.SET_BACKGROUNED_BANNER:
      return { ...state, backgroundImage: action.payload };
    case SHOP_REDUCER_TYPES.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      throw new Error();
  }
}
