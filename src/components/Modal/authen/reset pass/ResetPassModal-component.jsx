import "./ResetPassModal-style.scss"

import MediumModal from "../../medium modal component/medium-modal-component"
import closePng from "../../../../assest/feature/home page images/Close.png"
import BasicInput from "../../../features/input components/basic input component/Basic-component"
import AutoWidthButton from "../../../features/buttons components/autow basic button/B-button-component"


export default function ResetPassModal({backToLogin , close}) {


    return (
        <MediumModal>
            <div className="ResetPadd-modal-wrapper">
                <img className="cls-img" src={closePng} alt="" onClick={close} />
                <div className="title">Reset your password</div>
                <div className="text">Enter the email address associated with your account and we'll send you a link to reset your password</div>
                <div className="mt-5">
                    <BasicInput text={"Email"} />
                </div>
                    <div className="w-12 mt-5">
                        <AutoWidthButton text="Reset"/>
                    </div>
                <div className="sp-text" onClick={backToLogin}>Back to login</div>
            </div>
        </MediumModal>
    )
}