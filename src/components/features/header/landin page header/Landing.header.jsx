import "./Landing.header.style.scss"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import SignUpModal from "../../../Modal/authen/register/SignUpModal"

export default function LandingHeader() {
    const [modal, setModal] = useState(false)

    const toggle = () => { setModal(p => !p) }
    return (<>
        <div className="header-body d-flex justify-content-between">
            <Link to="/">
                <div className="header-brand">
                    droplinked
                </div>
            </Link>
            <div className="d-flex">
                <div className="login-wrapper">Login</div>
                <div className="login-wrapper" style={{ backgroundColor: "#353536" }} onClick={toggle}>Join today</div>
            </div>
        </div>
        {modal && <SignUpModal close={toggle} />}
    </>
    )
}