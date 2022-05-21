import "./Pages.Header.style.scss"
import { Link, useNavigate } from "react-router-dom";
import { UseWalletInfo } from "../../../../sevices/context/context";
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";
import { useState, useEffect } from "react"
import { useProfile } from "../../../../sevices/hooks/useProfile"

export default function PageHeader() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
    const { profile , logout } = useProfile()

    return (
        <>
            <div className="header-body d-flex justify-content-between">
                <Link to="/">
                    <div className="header-brand">
                        droplinked
                    </div>
                </Link>
                <div className="d-flex">
                    {(profile != null) ?
                        <div className="login-wrapper">
                            <div className="header-profile" onClick={() => { setToggleHeader(p => !p) }}>B</div>
                            {toggleHeader &&
                                <div className="header-nav">
                                    <div className="header-nav-item">Profile</div>
                                    <div className="header-nav-item">Settings</div>
                                    <div className="header-nav-item">Test</div>
                                    <div className="header-nav-item" onClick={logout}>logout</div>
                                </div>
                            }
                        </div>
                        :
                        <div className="login-wrapper">Login</div>
                    }
                    {(userData == undefined)
                        ?
                        <div className="wallet-wrapper" style={{ backgroundColor: "#353536" }}
                            onClick={authenticate}>
                            <img src={headerWalletIcon} alt="" />
                            Wallet
                        </div>
                        :
                        <div className="wallet-wrapper" style={{ backgroundColor: "#353536" }}
                            onClick={onSignOut}>
                            <img src={headerWalletIcon} className="fill-wallet" alt="" />
                            Wallet
                        </div>
                    }
                </div>
            </div>

        </>
    )
}