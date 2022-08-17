import "./LoginModal.style.scss"

import axios from 'axios';
import closePng from "../../../assest/feature/home page images/Close.png"
import ModalContainer from "../modal-container/modal-container"

import { BASE_URL } from "../../../api/BaseUrl"
import { useForm } from "react-hook-form";
import { useState,  useContext } from "react"
import { toastValue } from "../../../context/toastify/ToastContext"
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"


export default function LoginModal({ close, switchToggle, switchReset }) {

    const [loading, setLoading] = useState(false)
    const { addProfile } = useProfile()

    const { successToast, errorToast } = useContext(toastValue)

    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const onSubmit = data => {
        setLoading(true)

        let info = {
            email: data.email,
            password: data.password
        }

        axios.post(`${BASE_URL}/signin`, info)
            .then((res) => {
                if (res.data.status == "success") {
                    close();

                    if (res.data.data.user.type == "PRODUCER") {
                        switch (res.data.data.user.status) {
                            case "NEW":
                                //  errorToast("you must virified your account")
                                localStorage.setItem('registerEmail', JSON.stringify(info.email))
                                setLoading(false)
                                navigate("/emailConfirmation");
                                return;
                            case "VERIFIED":
                                localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
                                addProfile(res.data.data)
                                navigate("/register/shop-info");
                                return;
                            case "PROFILE_COMPLETED":
                                localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
                                addProfile(res.data.data)
                                navigate("/register/shop-info");
                                return;
                            case "SHOP_INFO_COMPLETED":
                                localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
                                addProfile(res.data.data)
                                navigate("/register/ims-type");
                                return;
                            case "IMS_TYPE_COMPLETED":
                                localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
                                addProfile(res.data.data)
                                navigate(`/${res.data.data.user.shopName}`);
                                return;
                            case "ACTIVE":
                                addProfile(res.data.data)
                                navigate(`/${res.data.data.user.shopName}`);
                                return;
                            case "DELETED":
                                errorToast("This account has been deleted")
                                setLoading(false)
                                return;
                        }
                    } else {
                        successToast("Login successfully")
                        addProfile(res.data.data)
                    }
                }
            })
            .catch(res => {
                errorToast(res.response.data.reason)
                setLoading(false)
            });
    };

    return (<>
        <ModalContainer close={close}>
            <div className="login-modal-component">
            <div className="title">Login
                <img className="close-btn" src={closePng} alt="" onClick={close} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}>

                <div className="input-label">
                    <label>Email</label>
                    <input type="email" placeholder="Example@email.com"
                        {...register("email", { required: true })} />
                </div>
                {errors.email?.type == 'required' && <span className="signup-modal-error">Email is required</span>}

                <div className="input-label">
                    <label >Password</label>
                    <input type="password" placeholder="Password"
                        {...register("password", { required: true })} />
                </div>
                {errors.password?.type == 'required' && <span className="signup-modal-error">Password is required</span>}
                <button className="submit-login-modal" type="submit" disabled={(loading) ? true : false}
                    style={{ backgroundColor: `${(loading == true) ? "#4A4A4A" : ""}` }}
                >Login</button>
                {/* {(loading)
                        ?
                        <input className="submit-login-modal" value="Login" style={{ backgroundColor: "#b3b3b3", outline: "none" }} />
                        :
                        <button className="submit-login-modal"  type="submit" >Login</button>
                    } */}

            </form>

            <div className="text mt-4" >
                <p><a onClick={switchReset}>Forgot password</a>?</p>
            </div>
            <div className="text mt-2">
                <p>Don’t have an account? <a onClick={switchToggle}>Register now</a>!</p>
            </div>
            </div>
        </ModalContainer>
    </>)
}