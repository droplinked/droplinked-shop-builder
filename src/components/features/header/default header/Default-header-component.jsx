import { useState } from "react"
import { UseWalletInfo } from "../../../../sevices/context/context";
import HeaderItem from "../header button component/Header-btn-component"
import SignUpModal from "../../../Modal/authen/register/SignUpModal"
import LoginModal from "../../../Modal/authen/login/LoginModal"
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";

export default function DefaulHeader() {
    const [signUpmodal, setSignModal] = useState(false)
    const [loginmodal, setloginModal] = useState(false)
    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

    const togglesignup = () => { setSignModal(p => !p) }
    const toggleLogin = () => { setloginModal(p => !p) }

    const switchToggl = () => {
        togglesignup();
        toggleLogin();
    }

    let url = window.location.pathname;


    return (<>
    <HeaderItem click={toggleLogin} style={{backgroundColor:"#222"}}>Login</HeaderItem>
        {(url == "/" || url=="/emailConfirmation") ?
            <HeaderItem click={togglesignup}>Join today</HeaderItem>
            :
            <>
                {(userData == undefined)
                    ?
                    <HeaderItem click={authenticate}><img src={headerWalletIcon} style={{ marginRight: "5px" }} />wallet</HeaderItem>
                    :
                    <HeaderItem click={onSignOut}><img src={headerWalletIcon} style={{ marginRight: "5px" }} />wallet</HeaderItem>
                }
            </>
        }
        

        {signUpmodal && <SignUpModal close={togglesignup} switchToggle={switchToggl} />}
        {loginmodal && <LoginModal close={toggleLogin} switchToggle={switchToggl} />}
    </>
    )
}