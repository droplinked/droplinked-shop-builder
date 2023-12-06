import { Link } from "react-router-dom";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import {
  UserHeaderWrapper,
  UserHeaderIcon,
} from "./HeaderLayout-style";
import droplinkedIcon from "assest/image/green-droplinked-logo.svg";
import HeaderLogin from "./parts/login/HeaderLogin";
import useHookStore from "functions/hooks/store/useHookStore";
import HeaderDashboardLogedin from "./parts/loged/HeaderDashboardLogedin";

const HeaderDashboard = () => {
  const { app: { shop } } = useHookStore();
  const { shopRoute } = useCustomNavigate()

  return (
    <UserHeaderWrapper position="fixed" top="0" left="0" right="0" zIndex="3" backgroundColor="#141414">
      <Link to={`${shopRoute}`}>
        <UserHeaderIcon src={droplinkedIcon} />
      </Link>
      {shop ? <HeaderDashboardLogedin /> : (
        <HeaderLogin />
      )}
    </UserHeaderWrapper>
  );
};

export default HeaderDashboard;
