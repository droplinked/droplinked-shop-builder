import { useDispatch, useSelector } from "react-redux";

import { selectCurrentProfile } from "../../store/profile/profile.selector";
import { selectCurrentShop } from "../../store/shop/shop.selector";
import { setCurrentShop } from "../../store/shop/shop.action";
import { setClear } from "../../store/profile/profile.action";
import { useApi } from "../useApi/useApi";
import { getUser } from "../../apis/userApiService";

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
