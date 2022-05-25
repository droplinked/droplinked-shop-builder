import "./mainHeader.scss";
import { Link } from "react-router-dom";
import { useProfile } from "../../../sevices/hooks/useProfile"
import DefaulHeader from "./default header/Default-header-component"
import UserHeader from "./user Header/User-header-component"




function MainHeader() {

  const { profile, logout } = useProfile();

  return (
    <div className="header-wrapp">
      <div className="header-body d-flex justify-content-between">
        <Link to="/">
          <div className="header-brand">
            droplinked
          </div>
        </Link>
        <div className="d-flex">
          {(profile)
            ?
            <UserHeader />
            :
            <DefaulHeader />
          }
        </div>
      </div>

    </div>
  )

}

export default MainHeader

