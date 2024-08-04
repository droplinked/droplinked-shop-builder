import useAppStore from "lib/stores/app/appStore";
import AppStorage from "lib/utils/app/sessions";

export function useProfile() {
  const { updateShop, user, shop, loading, fetchShop, reset } = useAppStore()
  const updateShopData = () => fetchShop({ shopName: shop.name })
  const setShopData = { update: (params: any) => updateShop(params), loading }

  const logoutUser = () => {
    reset()
    AppStorage.clearStorage()
  }

  return {
    profile: user,
    shop,
    setShopData,
    logoutUser,
    updateShopData,
  }
}