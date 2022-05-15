import "./ThankForRegister.scss"

export default function ThankPage() {

    return (
        <div className="thank-for-register-wrapper">
            <p className="thank-for-register-title">Thank You!</p>
            <p className="thank-for-register-detail"><span>Please check your email</span> for further instructions on how to complete your account setup.</p>
            <p className="resend-email-link">Resend the link</p>
            <div className="d-flex justify-content-center">
                <button className="con-to-homepage">Continue to homepage</button>
            </div>
        </div>
    )
}