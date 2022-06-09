
import { UseWalletInfo } from "../../../../sevices/context/context";
import HeaderItem from "../header button component/Header-btn-component"
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";
import profileimg from "../../../../assest/image/default profile/icons8-user-100.png"
import { useProfile } from "../../../../sevices/hooks/useProfile"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";



export default function UserHeader() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
    const { profile, logout } = useProfile()
    let url = window.location.pathname;
    let Profileimage = profile.avatar
    let navigate = useNavigate();

    let userStatus = profile.status;
    if (profile.user) {
        userStatus = profile.user.status
    } else {
        userStatus = profile.status
    }

    const clickProfile = () => {
        setToggleHeader(false)

        switch (userStatus) {
            case "VERIFIED":
                navigate("/register/personalInfo");
                return;
            case "PROFILE_COMPLETED":
                navigate("/register/shopInfo");
                return;
            case "SHOP_INFO_COMPLETED":
                navigate("/register/IMSSelect");
                return;
            case "IMS_TYPE_COMPLETED":
                navigate(`/shop/${profile.shopName}`);
                return;
            case "ACTIVE":
                navigate(`/shop/${profile.shopName}`);
                return;
        }
    }

    const clickIms = () => {
        navigate("/producer/ims");
    }

    return (<>
        {(userData == undefined)
            ?
            <HeaderItem click={authenticate}><img src={headerWalletIcon} style={{ marginRight: "5px" }} />Wallet</HeaderItem>
            :
            <HeaderItem style={{color:"#8053ff"}} click={onSignOut}><img src={headerWalletIcon} style={{ marginRight: "5px" }} />Wallet</HeaderItem>
        }
        <div className="login-wrapper">
            {(Profileimage)
                ?
                <img
                    src={Profileimage}
                    className="header-profile rounded-circle"
                    onClick={() => { setToggleHeader(p => !p) }}
                />
                :
                <div
                    className="header-profile rounded-circle"
                    onClick={() => { setToggleHeader(p => !p) }}
                ></div>
            }

            {toggleHeader &&
                <div className="header-nav">
                    <div className="header-nav-item" onClick={clickProfile}>Profile</div>
                    {(userStatus == "IMS_TYPE_COMPLETED") && <>
                        <Link to="/producer/ims">
                            <div className="header-nav-item" onClick={() => { setToggleHeader(false) }}>Inventory</div>
                        </Link>
                        <Link to="/producer/ruleset">
                            <div className="header-nav-item" onClick={() => { setToggleHeader(false) }}>Rulesets</div>
                        </Link>
                        <Link to="/producer/collection">
                            <div className="header-nav-item" onClick={() => { setToggleHeader(false) }}>Collection</div>
                        </Link>
                        <div className="header-nav-item">Settings</div>
                    </>
                    }
                    <div className="header-nav-item" onClick={logout}>Logout</div>
                </div>
            }
        </div>
    </>)
}