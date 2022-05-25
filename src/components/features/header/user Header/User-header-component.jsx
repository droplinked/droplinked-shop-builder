
import { UseWalletInfo } from "../../../../sevices/context/context";
import HeaderItem from "../header button component/Header-btn-component"
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";
import profileimg from "../../../../assest/image/default profile/icons8-user-100.png"
import { useProfile } from "../../../../sevices/hooks/useProfile"
import { useState } from "react"



export default function UserHeader() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
    const { profile, logout } = useProfile()
    let url = window.location.pathname;
    let Profileimage = profile.avatar

    return (<>
        {(userData == undefined)
            ?
            <HeaderItem click={authenticate}><img src={headerWalletIcon} style={{ marginRight: "5px" }} />wallet</HeaderItem>
            :
            <HeaderItem click={onSignOut}><img src={headerWalletIcon} style={{ marginRight: "5px" }} />wallet</HeaderItem>
        }
        <div className="login-wrapper">
            <img src={(Profileimage) ? Profileimage : profileimg}
                className="header-profile" onClick={() => { setToggleHeader(p => !p) }} />
            {toggleHeader &&
                <div className="header-nav">
                    {!url.includes("/registe") && <>
                        <div className="header-nav-item">Profile</div>
                        <div className="header-nav-item">Settings</div>
                        <div className="header-nav-item">Test</div>
                    </>
                    }
                    <div className="header-nav-item" onClick={logout}>logout</div>
                </div>
            }
        </div>
    </>)
}