import "./SignUpModal.scss"

import closePng from "../../../../assest/feature/home page images/Close.png"
import MediumModal from "../../medium modal component/medium-modal-component"
import SignupProducer from "./signup producer/signup-producer-component"
import SignupCustomer from "./signup Customer/signup-customer-component"

import { useLocation } from "react-router-dom";


export default function SignUpModal({ close, switchToggle, shopname }) {

    let location = useLocation().pathname.substring(0, 5);

    return (
        <MediumModal>
            <div className="register-modal-container">
                <div className="title">Create a free account
                    <img className="close-btn" src={closePng} alt="" onClick={close} />
                </div>
                {(location == "/shop")
                    ?
                    <SignupCustomer close={close} switchToggle={switchToggle} />
                    :
                    <SignupProducer close={close} shopname={shopname} switchToggle={switchToggle} />
                }
            </div>
        </MediumModal>
    )
}