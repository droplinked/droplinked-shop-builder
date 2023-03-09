import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentProfile } from "../../store/profile/profile.selector";
import { selectCurrentShop } from "../../store/shop/shop.selector";
import { setCurrentShop } from "../../store/shop/shop.action";

//this hook have been used for handle shop and user data
export function useProfile() {
  const dispatch = useDispatch();

  const profile = useSelector(selectCurrentProfile);
  const shop = useSelector(selectCurrentShop);

  const setShopData = (data) => {
    dispatch(setCurrentShop(data));
  };

  return {
    profile,
    shop,
    setShopData
  };
}
