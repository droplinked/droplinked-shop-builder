import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentProfile } from "../../store/profile/profile.selector";
import { selectCurrentShop } from "../../store/shop/shop.selector";
//this hook have been used for handle shop and user data
export function useProfile() {
  const profile = useSelector(selectCurrentProfile);
  const shop = useSelector(selectCurrentShop);

  return {
    profile,
    shop,
  };
}
