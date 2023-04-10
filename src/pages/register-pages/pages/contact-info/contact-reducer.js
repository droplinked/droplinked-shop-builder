export const SHOP_REDUCER_TYPES = {
  INITIALIZE: "INITIALIZE",
  CHANGE_WEBURL: "CHANGE_WEBURL",
  CHANGE_INSTAGRAM: "CHANGE_INSTAGRAM",
  CHANGE_TWITTER: "CHANGE_TWITTER",
  CHANGE_DISCORD: "CHANGE_DISCORD",
};

export function shopContactReducer(state, action) {
  switch (action.type) {
    case SHOP_REDUCER_TYPES.INITIALIZE:
      return { ...action.payload  };
    case SHOP_REDUCER_TYPES.CHANGE_WEBURL:
      return { ...state, webURL: action.payload };
    case SHOP_REDUCER_TYPES.CHANGE_INSTAGRAM:
      return { ...state, instagramURL: action.payload };
    case SHOP_REDUCER_TYPES.CHANGE_TWITTER:
      return { ...state, twitterURL: action.payload };
    case SHOP_REDUCER_TYPES.CHANGE_DISCORD:
      return { ...state, discordURL: action.payload };
    default:
      throw new Error();
  }
}
