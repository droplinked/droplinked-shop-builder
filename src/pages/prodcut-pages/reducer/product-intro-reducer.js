export const INTRO_REDUCER_TYPES = {
  INITIALIZE: "INITIALIZE",
  CHANGE_TITLE: "CHANGE_TITLE",
  CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
  CHANGE_MEDIA: "CHANGE_MEDIA",
};

export function productIntroReducer(state, action) {
  switch (action.type) {
    case INTRO_REDUCER_TYPES.INITIALIZE:
      return { ...action.payload };
    case INTRO_REDUCER_TYPES.CHANGE_TITLE:
      return { ...state, title: action.payload };
    case INTRO_REDUCER_TYPES.CHANGE_DESCRIPTION:
      return { ...state, description: action.payload };
    case INTRO_REDUCER_TYPES.CHANGE_MEDIA:
      return { ...state, media: action.payload };
    default:
      throw new Error();
  }
}
