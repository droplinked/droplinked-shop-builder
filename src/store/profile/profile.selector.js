import { PROFILE_STATUS } from "../../constant/profile-status-types";

export const selectCurrentProfile = (state) => state.profile.currentProfile;

export const selectIsActiveProducer = (state) => {
  let profile = state.profile.currentProfile;
  if (profile != null) {
    if (
      profile.type == "PRODUCER" &&
      (profile.status == PROFILE_STATUS.IMS_TYPE_COMPLETED ||
        profile.status == PROFILE_STATUS.ACTIVE)
    )
      return true;
    else return false;
  } else return null;
};

export const selectIsCustomer = (state) => {
  let profile = state.profile.currentProfile;
  if (profile != null) {
    if (profile.type == "CUSTOMER") return true;
    else return false;
  } else return null;
};
