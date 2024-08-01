import droplinkedIcon from "assest/image/green-droplinked-logo.svg";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { Link } from "react-router-dom";
import { UserHeaderIcon, UserHeaderWrapper } from "./HeaderLayout-style";
import HeaderDashboardLoggedin from "./parts/loged/HeaderDashboardLoggedin";
import HeaderLogin from "./parts/login/HeaderLogin";
import useAppStore from "lib/stores/app/appStore";

const HeaderDashboard = () => {
  const { shop } = useAppStore()
  const { shopRoute } = useCustomNavigate()

  return (
    <UserHeaderWrapper position="fixed" inset={0} zIndex="3" backgroundColor="#141414">
      <Link to={`${shopRoute}`}>
        <UserHeaderIcon src={droplinkedIcon} />
      </Link>
      {shop ? <HeaderDashboardLoggedin /> : <HeaderLogin />}
    </UserHeaderWrapper>
  )
}

export default HeaderDashboard;
