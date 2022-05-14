import "./Landing.header.style.scss"
import { Link, useNavigate } from "react-router-dom";

export default function LandingHeader() {

    return (
        <div className="header-body d-flex justify-content-between">
            <Link to="/">
                <div className="header-brand">
                    droplinked
                </div>
            </Link>
            <div className="d-flex">
            <div className="login-wrapper">Login</div>
            <div className="login-wrapper" style={{backgroundColor:"#353536"}}>Join today</div>
            </div>
        </div>
    )
}