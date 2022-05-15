import "./ThankForRegister.scss"
import { Link } from "react-router-dom";

export default function ThankPage() {

    return (
        <div className="thank-for-register-wrapper">
            <p className="thank-for-register-title">Thank You!</p>
            <p className="thank-for-register-detail"><span>Please check your email inbox</span> and verify your email address .</p>
            <p className="resend-email-link">Resend the link</p>
            <div className="d-flex justify-content-center">
                <Link to="/">
                    <button className="con-to-homepage">Continue to homepage</button>
                </Link>
            </div>
        </div>
    )
}