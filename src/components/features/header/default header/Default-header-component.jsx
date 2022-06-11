import { useState, useEffect } from "react"
import { UseWalletInfo } from "../../../../sevices/context/context";

import HeaderItem from "../header button component/Header-btn-component"
import SignUpModal from "../../../Modal/authen/register/SignUpModal"
import LoginModal from "../../../Modal/authen/login/LoginModal"
import headerWalletIcon from "../../../../assest/header/headerWalletIcon.svg";
import ResetPassModal from "../../../Modal/authen/reset pass/ResetPassModal-component";

export default function DefaulHeader() {
    const [signUpmodal, setSignModal] = useState(false)
    const [loginmodal, setloginModal] = useState(false)
    const [resetModal, setResetModal] = useState(false)
    
    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();

    const togglesignup = () => { setSignModal(p => !p) }
    const toggleLogin = () => { setloginModal(p => !p) }
    const toggleReset = () => { setResetModal(p => !p) }

    const switchToggl = () => {
        togglesignup();
        toggleLogin();
    }

    // useEffect(()=>{
    //     setUrl(window.location.pathname)
    //     console.log(window.location.pathname)
    // },[window.location.pathname])

    let url = window.location.pathname
    const switchLogRes = () => {
        toggleLogin();
        toggleReset();
    }



    return (<>
        <HeaderItem click={toggleLogin} style={{ backgroundColor: "#222" }}>Login</HeaderItem>
        {((url == "/") || (url == "/:") || (url == "/emailConfirmation") || (url == "/email-verification/:") || (url == "/producer/account-recovery/:token")) ?
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
        {loginmodal && <LoginModal close={toggleLogin} switchToggle={switchToggl} switchReset={switchLogRes} />}
        {resetModal && <ResetPassModal backToLogin={switchLogRes} close={() => { setResetModal(false) }} />}
    </>
    )
}