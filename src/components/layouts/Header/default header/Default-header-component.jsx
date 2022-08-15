import { useState } from "react"

import HeaderItem from "../components/header-button/Header-btn-component"
import SignUpModal from "../../../Modal/Register-modal/SignUpModal"
import LoginModal from "../../../Modal/Login-modal/LoginModal"
import ResetPassModal from "../../../Modal/ResetPass-modal/ResetPassModal-component";
import WalletButton from "../components/wallet-button/wallet-button-component"

export default function DefaulHeader() {

    // state for show (login , singup , resetpass)modals 
    const [signUpmodal, setSignModal] = useState(false)
    const [loginmodal, setloginModal] = useState(false)
    const [resetModal, setResetModal] = useState(false)

    let url = window.location.pathname

    const togglesignup = () => { setSignModal(p => !p) }
    const toggleLogin = () => { setloginModal(p => !p) }
    const toggleReset = () => { setResetModal(p => !p) }

    // switch between signup and login  modals
    const switchToggl = () => {
        togglesignup();
        toggleLogin();
    }

    // switch between resetpass and login  modals
    const switchLogRes = () => {
        toggleLogin();
        toggleReset();
    }


    // show login button
    // and if we are in landing page or emailconfirmation or recoveri show join today
    // else show wallet icon
    return (<>
        <HeaderItem click={toggleLogin} mr={{ base: "10px", md: '20px' }} style={{ backgroundColor: "#222" }}>Login</HeaderItem>

        {((url == "/") || (url == "/:") || (url == "/emailConfirmation") || (url == "/email-verification/:") || (url == "/producer/account-recovery/:token")) ?
            <HeaderItem click={togglesignup}>Join today</HeaderItem>
            :
            <WalletButton />
        }

        {/* show modals base on state */}
        {signUpmodal && <SignUpModal close={togglesignup} switchToggle={switchToggl} />}
        {loginmodal && <LoginModal close={toggleLogin} switchToggle={switchToggl} switchReset={switchLogRes} />}
        {resetModal && <ResetPassModal backToLogin={switchLogRes} close={() => { setResetModal(false) }} />}
    </>
    )
}