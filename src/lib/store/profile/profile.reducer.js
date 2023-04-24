import Profile_ACTION_TYPES from "./profile.types";

export const PROFILE_INITIAL_STATE = {
  currentProfile: JSON.parse(localStorage.getItem("profile")) || null,
};

export const profileReducer = (state = PROFILE_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case Profile_ACTION_TYPES.SET_CURRENT_PROFILE:
      return { ...state, currentProfile: payload };
    case Profile_ACTION_TYPES.LOGOUT_PROFILE:
      return { ...state, currentProfile: null };
    default:
      return state;
  }
};
