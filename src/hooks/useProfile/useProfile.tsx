import { useNavigate } from 'react-router-dom';
import useAppStore from 'stores/app/appStore';
import { clearStorage } from 'utils/app/authutils';

export function useProfile() {
  const navigate = useNavigate();
  const { updateShop, user, shop, loading, fetchShop, reset } = useAppStore();
  const updateShopData = () => fetchShop(shop.name);
  const setShopData = { update: (params: any) => updateShop(params), loading };

  const logoutUser = () => {
    reset();
    clearStorage();
    navigate('/');
  };

  return {
    profile: user,
    shop,
    setShopData,
    logoutUser,
    updateShopData
  };
}
