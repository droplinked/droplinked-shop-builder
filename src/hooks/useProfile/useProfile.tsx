import useAppStore from "lib/stores/app/appStore";
import { useStore } from "zustand";
import { IshopUpdateService } from "lib/apis/shop/interfaces";


//this hook have been used for handle shop and user data
export function useProfile() {
  const { updateShop, user, shop, loading } = useStore(useAppStore)
  const fetchShop = useAppStore((state) => state.fetchShop)

  const updateShopData = () => fetchShop({ shopName: shop.name })

  const setShopData = { update: (params: IshopUpdateService) => updateShop(params), loading }

  const logoutUser = () => {  };

  return {
    profile: user,
    shop,
    setShopData,
    logoutUser,
    updateShopData,
  };
}
