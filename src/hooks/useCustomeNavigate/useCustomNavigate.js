import { useNavigate } from "react-router-dom";

import { useProfile } from "../useProfile/useProfile";

//this hook have been used for handle shop and user data
export function useCustomNavigate() {

  const { shop } = useProfile();
  const navigate = useNavigate();

  const shopNavigate = (path) => navigate(`/${shop.name}/${path}`);

  return {
    shopNavigate,
  };
}
