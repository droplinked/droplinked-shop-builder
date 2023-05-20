import { SHOP_URL } from "lib/utils/app/variable";
import { useLocation, useNavigate } from "react-router-dom";

import { useProfile } from "../useProfile/useProfile";

interface IredirectToShop {
  productID?: string
  shopName?: string
}

//this hook have been used for handle shop and user data
export function useCustomNavigate() {

  const { shop } = useProfile();
  const navigate = useNavigate();
  const location = useLocation()

  const shopNavigate = (path, checkCurrentPath = false) => {
    const route = `/${shop.name}/c/${path}`
    const check = checkCurrentPath ? route !== location.pathname : true
    if (check) navigate(route);
  }

  const redirectToIo = ({ productID, shopName }: IredirectToShop) => {
    if (productID) {
      return `${SHOP_URL}/${shop.name}/product/${productID}`
    } else if (shopName) {
      return `${SHOP_URL}/${shopName}`
    } else {
      return `${SHOP_URL}/${shop.name}`
    }
  }

  return {
    shopNavigate,
    redirectToIo
  };
}
