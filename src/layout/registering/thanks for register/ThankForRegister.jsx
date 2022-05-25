import "./ThankForRegister.scss"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react"

export default function ThankPage() {
    const [message , setMessage] = useState("Resend the link")
    let email = JSON.parse(localStorage.getItem('registerEmail'));
    const resendEmail = () => {
        axios.post('https://api.droplinked.com/dev/email/resend',
         { email: "bedi.mns@gmail.com" })
            .then(res => { setMessage(res.data.message) })
            .catch(e => { setMessage("Not Found or Verified") })
    }

    return (
        <div className="thank-for-register-wrapper">
            <p className="thank-for-register-title">Thank You!</p>
            <p className="thank-for-register-detail"><span>Please check your email inbox</span> {`and verify your email address.`}</p>
            <p className="resend-email-link"
            onClick={resendEmail}
            >{message}</p>
            <div className="d-flex justify-content-center">
                <Link to="/">
                    <button className="con-to-homepage">Continue to homepage</button>
                </Link>
            </div>
        </div>
    )
}