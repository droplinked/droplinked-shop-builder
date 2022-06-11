import "./Account-recovery-page-style.scss"

import BasicInput from "../../../components/features/input components/basic input component/Basic-component"
import AutoWidthButton from "../../../components/features/buttons components/autow basic button/B-button-component"

import { useParams, useNavigate } from "react-router-dom";
import { toastValue } from "../../../sevices/context/Toast-context"
import { useState, useContext } from "react"
import { PostWithoutToken } from "../../../sevices/functoinal-service/CallApiService"


export default function AccountRecoveryPage() {

    const [newPass, setNewpass] = useState("")
    const [confirmnewPass, setConfirmNewpass] = useState("")
    const [confirmError, setConfirmError] = useState(false)
    const [btnActivd, setBtnActivd] = useState(false)
    const { successToast, errorToast } = useContext(toastValue)

    let navigate = useNavigate();
    let token = useParams().token;



    const changeConfirmPass = e =>{
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

            <BasicInput
                type={"password"}
                text={"New Password"}
                change={(e) => { setNewpass(e.target.value) }}
            />
            <div className="mt-4">
                <BasicInput
                    type={"password"}
                    text={"Confirm New Password"}
                    change={changeConfirmPass}
                />
            </div>
            {confirmError && <p className="error">{`Password and confirm password don't match.`}</p>}
            <div className="mt-4">
                <AutoWidthButton text={"Change my password"} click={changePassword} disable={btnActivd} />
            </div>
        </div>
    </>)
}