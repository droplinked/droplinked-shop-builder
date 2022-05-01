import "./mainHeader.scss";
import { UseWalletInfo } from "../../../sevices/context/context";
import headerWalletIcon from "../../../assest/header/headerWalletIcon.svg";
import { Link } from "react-router-dom";
import basket from "../../../assest/feature/header/basket-icon.png"
import more from "../../../assest/feature/header/more.png"
import Login from "./login modal/Login"
import { useState, useEffect } from "react"
import { useProfile } from "../../../sevices/hooks/useProfile"



function MainHeader() {
  let ur = window.location.pathname;
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
  const [emailModal, setEmailModal] = useState(false);
  const [mobilNav, setMobileNav] = useState(false);
  const { profile, logout } = useProfile();

  

  const showModal = () => {
    setEmailModal(true)
  }

  const hideModal = () => {
    setEmailModal(false)
  }



  return (<>
    {mobilNav &&
      <div className="d-flex justify-content-end">
        <div className="header-dropnav-body">
          {(profile == null || profile == undefined) ?
            <div className="header-dropnav-item"
              onClick={() => { showModal(); setMobileNav(false); }}
            ><p>Login</p></div>
            :
            <div className="header-dropnav-item"
              onClick={() => { logout(); setMobileNav(false); }}
            ><p>Logout</p></div>
          }

        </div>
      </div>
    }
    <div className="header-wrapp d-flex justify-content-center">
      <div className="header-body d-flex justify-content-between">
        <Link to="/">
          <div className="header-brand">
            <p className="text-center">droplinked</p>
          </div>
        </Link>

        <div className="header-nav d-md-flex d-none ">
          {(profile == null || profile == undefined) ?
            <div className="login-wrapper col-4 d-flex align-items-center"
              onClick={showModal}
            >
              <p>Login</p>
            </div>
            :
            <div className="login-wrapper col-4 d-flex align-items-center"
              onClick={() => { logout() }}
            >
              <p>Logout</p>
            </div>
          }

          {((window.location.pathname != "/")) &&
            (<div className="login-wrapper col-4 d-flex align-items-center">
              <p>Cart</p>
            </div>)
          }

          {userData ? (
            <div
              className="wallet-wrapper col-4 d-flex justify-content-center align-items-center"
              onClick={onSignOut}
            >
              <div className="d-flex justify-content-center h-auto">
                <img src={headerWalletIcon} className="sing-wallet" alt="" />
                <p>Wallet</p>
              </div>
            </div>
          ) : (
            <div
              className="wallet-wrapper col-4 d-flex justify-content-center align-items-center"
              onClick={authenticate}
            >
              <div className="d-flex justify-content-center " >
                <img src={headerWalletIcon} alt="" className="ratio ratio-1x1" />

                <p>Wallet</p>
              </div>
            </div>
          )}
        </div>
        <div className="mobile-nav d-flex d-md-none">
          {((window.location.pathname != "/")) &&
            <img src={basket} alt="" />
          }

          <img src={more} alt=""
            onClick={() => { setMobileNav(p => !p) }}
          />

        </div>

      </div>


    </div>


    {emailModal && <Login close={hideModal} />}
  </>
  );
}

export default MainHeader
