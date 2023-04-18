export const SHOP_REDUCER_TYPES = {
  INITIALIZE: "INITIALIZE",
  SET_LOGO: "SET_LOGO",
  SET_HEADER_ICON: "SET_HEADER_ICON",
  SET_BACKGROUNED_TEXT: "SET_BACKGROUNED_TEXT",
  SET_BACKGROUNED_BANNER: "SET_BACKGROUNED_BANNER",
  SET_THEME: "SET_THEME",
  SET_TEXT_COLOR: "SET_TEXT_COLOR",
  SET_BACKGROUNED_SECONDARY: "SET_BACKGROUNED_SECONDARY",
  SET_BACKGROUND_COLOR: "SET_BACKGROUND_COLOR",
};

export function shopDesignReducer(state, action) {
  switch (action.type) {
    case SHOP_REDUCER_TYPES.INITIALIZE:
      return { ...action.payload };
    case SHOP_REDUCER_TYPES.SET_LOGO:
      return { ...state, logo: action.payload };
    case SHOP_REDUCER_TYPES.SET_HEADER_ICON:
      return { ...state, headerIcon: action.payload };
    case SHOP_REDUCER_TYPES.SET_BACKGROUNED_TEXT:
      return { ...state, backgroundText: action.payload };
    case SHOP_REDUCER_TYPES.SET_BACKGROUNED_BANNER:
      return { ...state, backgroundImage: action.payload , backgroundImageSecondary: action.payload };
    case SHOP_REDUCER_TYPES.SET_THEME:
      return { ...state, theme: action.payload };
    case SHOP_REDUCER_TYPES.SET_TEXT_COLOR:
      return { ...state, textColor: action.payload };
    case SHOP_REDUCER_TYPES.SET_BACKGROUNED_SECONDARY:
      return { ...state, backgroundImageSecondary: action.payload };
    case SHOP_REDUCER_TYPES.SET_BACKGROUND_COLOR:
      return { ...state, backgroundColor: action.payload };
    default:
      throw new Error();
  }
}
//backgroundImageSecondary
