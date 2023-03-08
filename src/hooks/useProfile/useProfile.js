import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentProfile } from "../../store/profile/profile.selector";
//this hook have been used for handle shop and user data
export function useProfile() {
  const profile = useSelector(selectCurrentProfile);

  return {
    profile,
  };
}
