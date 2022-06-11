import "./ResetPassModal-style.scss"
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { PostWithoutToken } from "../../../../sevices/functoinal-service/CallApiService"
import { toastValue } from "../../../../sevices/context/Toast-context"


import MediumModal from "../../medium modal component/medium-modal-component"
import closePng from "../../../../assest/feature/home page images/Close.png"
import BasicInput from "../../../features/input components/basic input component/Basic-component"
import AutoWidthButton from "../../../features/buttons components/autow basic button/B-button-component"



export default function ResetPassModal({ backToLogin, close }) {

    const [disableBtn, setDisableBtn] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { successToast, errorToast } = useContext(toastValue)

    const SubmitForm = () => {

        if (validationEmail()) {
            setError(true)
        } else {
            setDisableBtn(true)
            const postData = { email: email }
            PostWithoutToken("/producer/reset-password", postData, handleRes)
        }

    }

    const validationEmail = () => {
        // let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
        let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regx.test(email)) {
            return false
        } else {
            return true
        }
    }

    const ChangeEmail = (e) => {
        setEmail(e.target.value);
        setError(false)
    }

    const handleRes = (status, value) => {
        if (status) {
            successToast(`Send an email to : ${email}`)
            setDisableBtn(false)
            close()
        } else {
            errorToast(value)
            setDisableBtn(false)
        }
    }

    return (
        <MediumModal>
            <div className="ResetPadd-modal-wrapper">
                <img className="cls-img" src={closePng} alt="" onClick={close} />
                <div className="title">Reset your password</div>
                <div className="text">Enter the email address associated with your account and we'll send you a link to reset your password.</div>
                <div className="mt-3">
                    <BasicInput text={"Email"} type={"email"} change={ChangeEmail} />
                    <div style={{ height: "12px", width: "100%", margin: "0px 0px 0px 0px" }}>
                        {error && <p className="error">{`The email address is invalid.`}</p>}
                    </div>
                </div>
                <div className="w-12 mt-3">
                    <AutoWidthButton text="Reset" click={SubmitForm} disable={disableBtn} />
                </div>
                <div className="sp-text" onClick={backToLogin}>Back to login</div>
            </div>
        </MediumModal>
    )
}