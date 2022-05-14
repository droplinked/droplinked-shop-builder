import "./Landing.header.style.scss"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import SignUpModal from "../../../Modal/authen/register/SignUpModal"
import LoginModal from "../../../Modal/authen/login/LoginModal"
export default function LandingHeader() {
    const [signUpmodal, setSignModal] = useState(false)
    const [loginmodal, setloginModal] = useState(false)

    const togglesignup = () => { setSignModal(p => !p) }
    const toggleLogin = () => { setloginModal(p => !p) }
    const switchToggl = () => { togglesignup(); toggleLogin(); }
    return (<>
        <div className="header-body d-flex justify-content-between">
            <Link to="/">
                <div className="header-brand">
                    droplinked
                </div>
            </Link>
            <div className="d-flex">
                <div className="login-wrapper" onClick={toggleLogin}>Login</div>
                <div className="login-wrapper" style={{ backgroundColor: "#353536" }} onClick={togglesignup}>Join today</div>
            </div>
        </div>
        {signUpmodal && <SignUpModal close={togglesignup} switchToggle={switchToggl} />}
        {loginmodal && <LoginModal close={toggleLogin} switchToggle={switchToggl} />}
    </>
    )
}