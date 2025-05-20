import useAppStore from 'stores/app/appStore';
import { clearStorage } from 'utils/app/authutils';

export function useProfile() {
  const { updateShop, user, shop, loading, fetchShop, reset } = useAppStore();
  const updateShopData = () => fetchShop({ shopName: shop.name });
  const setShopData = { update: (params: any) => updateShop(params), loading };

  const logoutUser = () => {
    reset();
    clearStorage();
  };

  return {
    profile: user,
    shop,
    setShopData,
    logoutUser,
    updateShopData
  };
}
