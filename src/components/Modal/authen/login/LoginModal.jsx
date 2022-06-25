import "./LoginModal.style.scss"

import axios from 'axios';
import closePng from "../../../../assest/feature/home page images/Close.png"

import { BasicURL } from "../../../../sevices/functoinal-service/CallApiService"
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react"
import { toastValue } from "../../../../sevices/context/Toast-context"
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../../../sevices/hooks/useProfile"


export default function LoginModal({ close, switchToggle, switchReset }) {

    const [loading, setLoading] = useState(false)
    const { addProfile } = useProfile()

    const { successToast, errorToast } = useContext(toastValue)


    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const onSubmit = data => {
        setLoading(true)

        // "type": "PRODUCER"
        let info = {
            email: data.email,
            password: data.password
        }

        axios.post(BasicURL + '/signin', info)
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
                                addProfile(res.data.data)
                                navigate("/register/personalInfo");
                                return;
                            case "PROFILE_COMPLETED":
                                addProfile(res.data.data)
                                navigate("/register/shopInfo");
                                return;
                            case "SHOP_INFO_COMPLETED":
                                addProfile(res.data.data)
                                navigate("/register/IMSSelect");
                                return;
                            case "IMS_TYPE_COMPLETED":
                                addProfile(res.data.data)
                                navigate(`/shop/${res.data.data.user.shopName}`);
                                return;
                            case "ACTIVE":
                                addProfile(res.data.data)
                                navigate(`/shop/${res.data.data.user.shopName}`);
                                return;
                            case "DELETED":
                                errorToast("your account has been deleted")
                                setLoading(false)
                                return;
                        }
                    } else {
                        successToast("Login successfully")
                    }
                }
            })
            .catch(res => {
                errorToast(res.response.data.reason)
                setLoading(false)
            });
    };

    return (<>
        <div className="login-modal-wraper">
            <div className="login-modal-body">
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
                    {errors.email?.type === 'required' && <span className="signup-modal-error">email is required</span>}

                    <div className="input-label">
                        <label >Password</label>
                        <input type="password" placeholder="Password"
                            {...register("password", { required: true })} />
                    </div>
                    {errors.password?.type === 'required' && <span className="signup-modal-error">password is required</span>}
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
        </div>
    </>)
}