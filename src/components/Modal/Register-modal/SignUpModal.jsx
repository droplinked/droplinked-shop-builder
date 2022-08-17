import "./SignUpModal.scss"

import closePng from "../../../assest/icon/Close.png"
import ModalContainer from "../modal-container/modal-container"
import SignupProducer from "./signup producer/signup-producer-component"
import SignupCustomer from "./signup Customer/signup-customer-component"

import { useParams } from "react-router-dom";


export default function SignUpModal({ close, switchToggle, shopname }) {

    const params = useParams()

    return (
        <ModalContainer close={close}>
            <div className="register-modal-container">
                <div className="title">Create a free account
                    <img className="close-btn" src={closePng} alt="" onClick={close} />
                </div>
                {(params.shopname != undefined)
                    ?
                    <SignupCustomer close={close} switchToggle={switchToggle} />
                    :
                    <SignupProducer close={close} shopname={shopname} switchToggle={switchToggle} />
                }
            </div>
        </ModalContainer>
    )
}