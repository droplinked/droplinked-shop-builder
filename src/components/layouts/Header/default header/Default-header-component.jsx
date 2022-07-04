import { useState, useEffect } from "react"

import HeaderItem from "../header button component/Header-btn-component"
import SignUpModal from "../../../Modal/Register-modal/SignUpModal"
import LoginModal from "../../../Modal/Login-modal/LoginModal"
import ResetPassModal from "../../../Modal/ResetPass-modal/ResetPassModal-component";
import WalletButton from "../wallet button/wallet-button-component"

export default function DefaulHeader() {
    const [signUpmodal, setSignModal] = useState(false)
    const [loginmodal, setloginModal] = useState(false)
    const [resetModal, setResetModal] = useState(false)
    

    const togglesignup = () => { setSignModal(p => !p) }
    const toggleLogin = () => { setloginModal(p => !p) }
    const toggleReset = () => { setResetModal(p => !p) }

    const switchToggl = () => {
        togglesignup();
        toggleLogin();
    }



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
            <WalletButton/>
        }


        {signUpmodal && <SignUpModal close={togglesignup} switchToggle={switchToggl} />}
        {loginmodal && <LoginModal close={toggleLogin} switchToggle={switchToggl} switchReset={switchLogRes} />}
        {resetModal && <ResetPassModal backToLogin={switchLogRes} close={() => { setResetModal(false) }} />}
    </>
    )
}