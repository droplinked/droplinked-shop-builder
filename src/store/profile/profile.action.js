import Profile_ACTION_TYPES from "./profile.types";
import { createAction } from "../reducer-utils";



export const setCurrentUser = (data) => {
  let time = new Date().getTime();
  localStorage.setItem("login-time", JSON.stringify(time));
  localStorage.setItem("token", JSON.stringify(data.access_token));
  localStorage.setItem("profile", JSON.stringify(data.user));
  console.log("data ", data.user);
  return createAction(Profile_ACTION_TYPES.SET_CURRENT_PROFILE, data.user);
};

export const logoutUser = () => {
  localStorage.clear();
  return createAction(Profile_ACTION_TYPES.LOGOUT_PROFILE);
};

