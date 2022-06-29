import "./Login.scss"
import closePng from "../../../../assest/feature/home page images/Close.png"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useProfile } from "../../../../sevices/hooks/useProfile"
import { useNavigate } from 'react-router-dom'
import { useCart } from "../../../../sevices/hooks/useCart"

import axios from 'axios';

function Login({ close, showSign }) {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [type, setType] = useState("creator")
    const { profile, addProfile } = useProfile();
    const { firstUpdateCart } = useCart();


    const submitForm = (data) => {
        axios.get('https://dev.flatlay.io/login', {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + window.btoa(data.email + ":" + data.passsword),
            }
        }
        ).then((response) => {
            localStorage.setItem("token", response.data.id);
            addProfile(response.data)
            console.log(response.data.id)
            close();
            navigate('/creatorpage')
        });
    }

    return (
        <div className="email-modal-wrap">
            <div className="email-modal-body d-flex justify-content-center align-item-center" style={{ height: 'auto' }}>
                <div className="email-modal-contain d-flex flex-column">
                    <div className=" d-flex align-item-center">
                        <div className="bradn-creator-wrap">
                            <button className={`creato-brand-btn ${(type == "creator") && "selected-type-btn"}`} style={{ marginRight: "5px" }}
                                onClick={() => { setType("creator") }}
                            >Customer</button>
                            <button className={`creato-brand-btn ${(type == "brand") && "selected-type-btn"}`} style={{ marginLeft: "5px" }}
                                onClick={() => { setType("brand") }}
                            >Brand</button>
                        </div>
                        <div className="close-icon-wrap">
                            <img className="close rounded-circle ratio ratio-1x1" src={closePng} alt="closePng" onClick={close} style={{ margin: "auto 0px" }} />
                        </div>
                    </div>

                    <div className="email-modal-input-wrap">
                        <form onSubmit={handleSubmit(submitForm)} className="login-modal-f">
                            <input
                                style={{ backgroundColor: "transparent" }}
                                className="login-modal-input"
                                type="email" placeholder="email@example.com" {...register("email", { required: true })}
                                autoComplete="off"
                            />
                            <p className="login-modal-error">{errors.email && "please enter email"}</p>
                            <input
                                className="login-modal-input"
                                type="password" placeholder="Password" {...register("passsword", { required: true })}
                                autoComplete="off"
                            />
                            <p className="login-modal-error">{errors.passsword && "please enter password"}</p>
                            <div className="d-flex h-100 justify-content-between">
                                <input
                                    className="login-modal-submit-btn"
                                    type="submit" value="Login" />
                            </div>
                        </form>
                        <div className="d-flex justify-content-center alredy-modal">
                            <p>Don’t have an account?</p><span
                                onClick={() => { close(); showSign(); }}
                            >Register now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login