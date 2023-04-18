import { useLocation, useNavigate } from "react-router-dom";

import { useProfile } from "../useProfile/useProfile";

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

  return {
    shopNavigate,
  };
}
