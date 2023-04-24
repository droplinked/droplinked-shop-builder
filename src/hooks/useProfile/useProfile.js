import { useDispatch, useSelector } from "react-redux";

import { selectCurrentProfile } from "lib/store/profile/profile.selector";
import { selectCurrentShop } from "lib/store/shop/shop.selector";
import { setCurrentShop } from "lib/store/shop/shop.action";
import { setClear } from "lib/store/profile/profile.action";
import { getUser } from "lib/apis/userApiService";
import { useApi } from "hooks/useApi/useApi";

//this hook have been used for handle shop and user data
export function useProfile() {
  const dispatch = useDispatch();
  const { getApi } = useApi();

  const profile = useSelector(selectCurrentProfile);
  const shop = useSelector(selectCurrentShop);

  const updateShopData = async () => {
    const result = await getApi(getUser());
    dispatch(setCurrentShop(result.shop));
  };

  const setShopData = (data) => {
    dispatch(setCurrentShop(data));
  };

  const logoutUser = () => {
    dispatch(setClear());
  };

  return {
    profile,
    shop,
    setShopData,
    logoutUser,
    updateShopData,
  };
}
