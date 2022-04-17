import "./mainHeader.scss";
import { UseWalletInfo } from "../../../sevices/context/context";
import headerWalletIcon from "../../../assest/header/headerWalletIcon.svg";
import { Link } from "react-router-dom";

export default function MainHeader() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

  return (
    <div className="header-wrapp d-flex justify-content-center">
      <div className="header-body d-flex justify-content-between">
        <Link to="/">
          <div className="header-brand">
            <p>droplinked</p>
          </div>
        </Link>

        <div className="header-nav d-flex ">
          <div className="login-wrapper col-6 d-flex align-items-center">
            <p>Login</p>
          </div>
          {userData ? (
            <div
              className="wallet-wrapper col-6 d-flex justify-content-center align-items-center"
              onClick={onSignOut}
            >
              <img src={headerWalletIcon} className="sing-wallet" alt="" />

              <p>Wallet</p>
            </div>
          ) : (
            <div
              className="wallet-wrapper col-6 d-flex justify-content-center align-items-center"
              onClick={authenticate}
            >
              <img src={headerWalletIcon} alt="" />

              <p>Wallet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
