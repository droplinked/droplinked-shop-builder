import "./LoginModal.style.scss"
import axios from 'axios';
import closePng from "../../../../assest/feature/home page images/Close.png"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../../../sevices/hooks/useProfile"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function LoginModal({ close, switchToggle }) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(undefined)
    const { addProfile } = useProfile()
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const onSubmit = data => {

        setLoading(true)

        let info = {
            email: data.email,
            password: data.password
        }

        axios.post('https://api.droplinked.com/dev/producer/signin', info)
            .then((res) => {
                close();
                switch (res.data.user.status) {
                    case "NEW":
                        toast.error("you must virified your account")
                        localStorage.setItem('registerEmail', JSON.stringify(info.email))
                        setLoading(false)
                        navigate("/emailConfirmation");
                        return;
                    case "VERIFIED":
                        addProfile(res.data)
                        navigate("/register/personalInfo");
                        return;
                    case "PROFILE_COMPLETED":
                        addProfile(res.data)
                        navigate("/register/shopInfo");
                        return;
                    case "SHOP_INFO_COMPLETED":
                        addProfile(res.data)
                        navigate("/register/IMSSelect");
                        return;
                        case  "IMS_TYPE_COMPLETED":
                            addProfile(res.data)
                            navigate(`/shop/${res.data.user.shopName}`);
                            return;
                    case "ACTIVE":
                        addProfile(res.data)
                        navigate(`/shop/${res.data.user.shopName}`);
                        return;
                    case "DELETED":
                        toast.error("your account has been deleted")
                        setLoading(false)
                        return;
                }
            })
            .catch(error => {
                toast.error(error.response.data.message.message)
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
                    {(loading)
                        ?
                        <input className="submit-login-modal" value="Login" style={{ backgroundColor: "#b3b3b3", outline: "none" }} />
                        :
                        <input className="submit-login-modal" value="Login" type="submit" />
                    }

                </form>

                <div className="text mt-4">
                    <p><a>Forgot password ?</a></p>
                </div>
                <div className="text mt-2">
                    <p>Don’t have an account ? <a onClick={switchToggle}>Register now</a></p>
                </div>
            </div>


        </div>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />

    </>)
}