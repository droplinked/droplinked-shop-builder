import "./SignUpModal.scss"

import closePng from "../../../../assest/feature/home page images/Close.png"
import MediumModal from "../../medium modal component/medium-modal-component"
import SignupProducer from "./signup producer/signup-producer-component"
import SignupCustomer from "./signup Customer/signup-customer-component"

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react"
import { useForm } from "react-hook-form";
import { PostWithoutToken } from "../../../../sevices/functoinal-service/CallApiService"
import { toastValue } from "../../../../sevices/context/Toast-context"

export default function SignUpModal({ close , switchToggle , shopname}) {



    const [registerType, setRegisterType] = useState("Producer")





    return (
        <MediumModal>
            <div className="register-modal-container">
                <div className="title">Create a free account
                    <img className="close-btn" src={closePng} alt="" onClick={close} />
                </div>

                <div className="select-rgType-wrapper">
                    <div
                        className={`select-item ${(registerType == "Producer") ? "selected-type" : ""}`}
                        onClick={() => { setRegisterType("Producer") }}
                    >Producer</div>
                    <div
                        className={`select-item ${(registerType == "Costumer") ? "selected-type" : ""}`}
                        onClick={() => { setRegisterType("Costumer") }}
                    >Costumer</div>
                </div>

                {(registerType == `Producer`) &&
                    <SignupProducer close={close} shopname={shopname} switchToggle={switchToggle} />
                }
                 {(registerType == `Costumer`) &&
                    <SignupCustomer close={close} switchToggle={switchToggle}/>
                }

            </div>
        </MediumModal>
    )
}