import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentProfile } from "../../store/profile/profile.selector";

export function useProfile() {
  const profile = useSelector(selectCurrentProfile);

  return {
    profile,
  };
}
