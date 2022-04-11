import "./mainHeader.scss";
import { UseWalletInfo } from "../../../sevices/context/context";
import walletIcon from "../../../assest/header/Unknown.svg";
import { Link } from "react-router-dom";

export default function MainHeader() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

  return (
    <div className="header d-flex">
      <div className="header-wrapper d-flex justify-content-between">
        <div className="brand-logo col-6 col-md-4">
          <h1>
            <Link to="/" className="brandName">
              droplinked
            </Link>
          </h1>
        </div>

        <div className="wallet col-6 col-md-3">
          {userData ? (
            <img
              src={walletIcon}
              alt=""
              className="wallet-icon wallet-icon-fill"
              onClick={onSignOut}
            />
          ) : (
            <img
              src={walletIcon}
              alt=""
              className="wallet-icon wallet-icon-notfill"
              onClick={authenticate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* {userData
                ?
                    (<GiWallet className="wallet-icon wallet-icon-fill"
                    onClick={onSignOut}
                    />)
                :
                    (<GiWallet className="wallet-icon wallet-icon-notfill" 
                        onClick={authenticate}
                    />)
                } */
}
