import logo from "../../assest/shared/Flatlay-Logo.svg";
import { AiOutlineWallet } from "react-icons/ai";
import { AiFillWallet } from "react-icons/ai";

import { UseWalletInfo } from "../context/context";

export default function Header() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

  return (
    <div className="px-xl-5 border-bottom border-grey bg-white">
      <div className="container-fluid px-3 py-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <a className="d-inline-block mr-3">
            <img src={logo} alt="" />
          </a>
          <div className="d-flex flex-row align-items-center justify-content-between ">
            <button
              className="btn  text-flatlay-black  text-nowrap"
              onClick={userData ? onSignOut : authenticate}
            >
              {userData ? (
                <h1>
                  <AiFillWallet />
                </h1>
              ) : (
                <h1>
                  <AiOutlineWallet />
                </h1>
              )}
            </button>

            <button className="btn  text-flatlay-black  text-nowrap">
              <h1>
                <i className="bi bi-person-circle"></i>
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
