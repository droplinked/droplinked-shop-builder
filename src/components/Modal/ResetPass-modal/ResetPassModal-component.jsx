import "./ResetPassModal-style.scss"

import { useState,  useContext } from "react"

import { PostWithoutToken } from "../../../sevices/functoinal-service/CallApiService"
import { toastValue } from "../../../context/toastify/ToastContext"


import ModalContainer from "../modal-container/modal-container"
import closePng from "../../../assest/feature/home page images/Close.png"
import BasicButton from "../../shared/BasicButton/BasicButton"
import FormInput from "../../shared/FormInput/FormInput"

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
        <ModalContainer close={close}>
            <div className="ResetPadd-modal-wrapper">
                <img className="cls-img" src={closePng} alt="" onClick={close} />
                <div className="title">Reset your password</div>
                <div className="text">Enter the email address associated with your account and we'll send you a link to reset your password.</div>
                <div className="mt-3">
                    <FormInput label={"Email"} type={"email"} changeValue={ChangeEmail}/>
                    <div style={{ height: "12px", width: "100%", margin: "0px 0px 0px 0px" }}>
                        {error && <p className="error">{`The email address is invalid.`}</p>}
                    </div>
                </div>
                <div className="w-12 mt-3">
                    <BasicButton click={SubmitForm}  disabled={disableBtn}>Reset password</BasicButton>
                </div>
                <div className="sp-text" onClick={backToLogin}>Back to login</div>
            </div>
        </ModalContainer>
    )
}