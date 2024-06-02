import droplinkedIcon from "assest/image/green-droplinked-logo.svg";
import useHookStore from "functions/hooks/store/useHookStore";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { Link } from "react-router-dom";
import { UserHeaderIcon, UserHeaderWrapper } from "./HeaderLayout-style";
import HeaderDashboardLoggedin from "./parts/loged/HeaderDashboardLoggedin";
import HeaderLogin from "./parts/login/HeaderLogin";

const HeaderDashboard = () => {
  const { app: { shop } } = useHookStore()
  const { shopRoute } = useCustomNavigate()

  return (
    <UserHeaderWrapper position="fixed" top="0" left="0" right="0" zIndex="3" backgroundColor="#141414">
      <Link to={`${shopRoute}`}>
        <UserHeaderIcon src={droplinkedIcon} />
      </Link>
      {shop ? <HeaderDashboardLoggedin /> : (
        <HeaderLogin />
      )}
    </UserHeaderWrapper>
  )
}

export default HeaderDashboard;
