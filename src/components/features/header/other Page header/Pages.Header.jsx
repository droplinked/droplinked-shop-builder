import "./Pages.Header.style.scss"
import { Link, useNavigate } from "react-router-dom";
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";
import { useState, useEffect } from "react"

export default function PageHeader() {
    const [toggleHeader, setToggleHeader] = useState(false)
    return (
        <>
            <div className="header-body d-flex justify-content-between">
                <Link to="/">
                    <div className="header-brand">
                        droplinked
                    </div>
                </Link>
                <div className="d-flex">
                    {(false) ?
                        <div className="login-wrapper">
                            <div className="header-profile" onClick={()=>{setToggleHeader(p => !p)}}>B</div>
                            {toggleHeader &&
                                <div className="header-nav">
                                    <div className="header-nav-item">Profile</div>
                                    <div className="header-nav-item">Settings</div>
                                    <div className="header-nav-item">Test</div>
                                </div>
                            }
                        </div>
                        :
                        <div className="login-wrapper">Login</div>
                    }
                    <div className="wallet-wrapper" style={{ backgroundColor: "#353536" }}>
                        <img src={headerWalletIcon} alt="" />
                        Wallet
                    </div>
                </div>
            </div>

        </>
    )
}