import { IshopUpdateService } from "lib/apis/shop/interfaces";
import useHookStore from "../store/useHookStore";


//this hook have been used for handle shop and user data
export function useProfile() {
  const { app: { updateShop, user, shop, loading, fetchShop } } = useHookStore()

  const updateShopData = () => fetchShop({ shopName: shop.name })

  const setShopData = { update: (params: IshopUpdateService) => updateShop(params), loading }

  const logoutUser = () => { };

  return {
    profile: user,
    shop,
    setShopData,
    logoutUser,
    updateShopData,
  };
}
