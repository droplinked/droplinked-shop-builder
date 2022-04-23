import "./mainHeader.scss";
import { UseWalletInfo } from "../../../sevices/context/context";
import headerWalletIcon from "../../../assest/header/headerWalletIcon.svg";
import { Link } from "react-router-dom";
import basket from "../../../assest/feature/header/basket-icon.png"
import more from "../../../assest/feature/header/more.png"

export default function MainHeader() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

  return (
    <div className="header-wrapp d-flex justify-content-center">
      <div className="header-body d-flex justify-content-between">
        <Link to="/">
          <div className="header-brand">
            <p className="text-center">droplinked</p>
          </div>
        </Link>

        <div className="header-nav d-md-flex d-none ">
          <div className="login-wrapper col-4 d-flex align-items-center">
            <p>Login</p>
          </div>
          <div className="login-wrapper col-4 d-flex align-items-center">
            <p>Cart</p>
          </div>
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
          <img src={basket} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
    </div>
  );
}
