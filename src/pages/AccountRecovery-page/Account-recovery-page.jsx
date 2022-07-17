import "./Account-recovery-page-style.scss"


import BasicButton from "../../components/shared/BasicButton/BasicButton"
import FormInput from "../../components/shared/FormInput/FormInput"

import { useParams, useNavigate } from "react-router-dom";
import { toastValue } from "../../context/toastify/ToastContext"
import { useState, useContext } from "react"
import { PostWithoutToken } from "../../sevices/functoinal-service/CallApiService"
import { useForm } from "react-hook-form";


export default function AccountRecoveryPage() {

    const [newPass, setNewpass] = useState("")
    const [confirmnewPass, setConfirmNewpass] = useState("")
    const [confirmError, setConfirmError] = useState(false)
    const [btnActivd, setBtnActivd] = useState(false)
    const { successToast, errorToast } = useContext(toastValue)

    const { register, formState: { errors }, handleSubmit } = useForm();

    let navigate = useNavigate();
    let token = useParams().token;

    const changeConfirmPass = e => {
        setConfirmNewpass(e.target.value)
        setConfirmError(false)
    }

    const changePassword = () => {
        if (newPass !== confirmnewPass) {
            setConfirmError(true)
            return
        }

        setBtnActivd(true)

        const postInfo = {
            accountRecoveryToken: token,
            newPassword: newPass
        }

        PostWithoutToken("/producer/account-recovery", postInfo, resHandle)
    }

    const resHandle = (status, message) => {
        if (status) {
            successToast("Your password has been changed successfully. Please login again.")
            navigate("/?modal=login")
        } else {
            errorToast(message)
            navigate("/")
        }
    }

    return (<>
        <div className="recovery-page-wrapper">
            <div className="title">Change your password</div>
            <FormInput
                type={"password"}
                label={"New Password"}
                value={newPass}
                changeValue={(e) => { setNewpass(e.target.value) }}
            />
            <div className="mt-4">
            <FormInput
                type={"password"}
                label={"Confirm New Password"}
                value={confirmnewPass}
                changeValue={changeConfirmPass}
            />
            </div>
            {confirmError && <p className="error">{`Password and confirm password don't match.`}</p>}
            <div className="mt-4" >
                <BasicButton click={changePassword} disabled={btnActivd}>Change my password</BasicButton>
            </div>
        </div>
    </>)
}