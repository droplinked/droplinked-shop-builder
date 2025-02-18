import { useLocation, useNavigate } from "react-router-dom";

//this hook have been used for handle shop and user data
export function useCustomNavigate() {
  const navigate = useNavigate()
  const location = useLocation()
  const shopRoute = "/analytics/dashboard"

  const shopNavigate = (path: string, checkCurrentPath = false) => {
    const route = path ? `${shopRoute}/${path}` : shopRoute
    const check = checkCurrentPath ? route !== location.pathname : true
    if (check) navigate(route)
  }

  return { shopNavigate, shopRoute }
}
