import "./LoginModal.style.scss"

import closePng from "../../../assest/icon/Close.png"
import ModalContainer from "../modal-container/modal-container"

import { useForm } from "react-hook-form";
import { useState, useContext } from "react"
import { toastValue } from "../../../context/toastify/ToastContext"
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { SignIn } from "../../../api/base-user/Auth-api"

// this modal for login user and managment function after login based on status and userType
export default function LoginModal({ close, switchToggle, switchReset }) {

    // state for disable buttons
    const [loading, setLoading] = useState(false)
    // hooks
    const { addProfile } = useProfile()
    const { successToast, errorToast } = useContext(toastValue)
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    // submit form function
    const onSubmit = async (data) => {

        let info = {
            email: data.email,
            password: data.password
        }
        // set in loading state
        setLoading(true)

        let result = await SignIn(info)

        if (result.status == "success") {
            loginFunction(result.data)
        } else {
            errorToast(result.reason)
        }

        // set in normal situation
        setLoading(false)
    };


    // action on user data based on type and status
    const loginFunction = (data) => {
        //first close modal
        close()

        if (data.user.type == "PRODUCER") {

            let status = data.user.status

            if (status === "NEW") {
                localStorage.setItem('registerEmail', JSON.stringify(data.user.email))
                navigateUser(status)
                return;
            } else if (status === "DELETED") {
                errorToast("This account has been deleted")
                return;
            } else {
                navigateUser(status, data.user.shopName)
                addProfile(data)
                
                return
            }

        } else {
            successToast("Login successfully")
            addProfile(data)
        }
    }

    // navigate user based on status
    const navigateUser = (status, shopName) => {
        switch (status) {
            case "NEW":
                navigate("/email-confirmation")
                return
            case "VERIFIED":
                navigate("/register/shop-info")
                return
            case "PROFILE_COMPLETED":
                navigate("/register/shop-info")
                return
            case "SHOP_INFO_COMPLETED":
                navigate("/register/ims-type")
                return
            case "IMS_TYPE_COMPLETED":
                navigate(`/${shopName}`)
                return
            case "ACTIVE":
                navigate(`/${shopName}`)
                return
        }
    }

    return (<>
        <ModalContainer close={close}>
            <div className="login-modal-component">
                <div className="title">Login
                    {/* <img className="close-btn" src={closePng} alt="" onClick={close} /> */}
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


// last login code
 // axios.post(`${BASE_URL}/signin`, info)
        //     .then((res) => {
        //         if (res.data.status == "success") {
        //             close();

        //             if (res.data.data.user.type == "PRODUCER") {
        //                 switch (res.data.data.user.status) {
        //                     case "NEW":
        //                         //  errorToast("you must virified your account")
        //                         localStorage.setItem('registerEmail', JSON.stringify(info.email))
        //                         setLoading(false)
        //                         navigate("/email-confirmation");
        //                         return;
        //                     case "VERIFIED":
        //                         localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
        //                         addProfile(res.data.data)
        //                         navigate("/register/shop-info");
        //                         return;
        //                     case "PROFILE_COMPLETED":
        //                         localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
        //                         addProfile(res.data.data)
        //                         navigate("/register/shop-info");
        //                         return;
        //                     case "SHOP_INFO_COMPLETED":
        //                         localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
        //                         addProfile(res.data.data)
        //                         navigate("/register/ims-type");
        //                         return;
        //                     case "IMS_TYPE_COMPLETED":
        //                         localStorage.setItem("token", JSON.stringify(res.data.data.jwt));
        //                         addProfile(res.data.data)
        //                         navigate(`/${res.data.data.user.shopName}`);
        //                         return;
        //                     case "ACTIVE":
        //                         addProfile(res.data.data)
        //                         navigate(`/${res.data.data.user.shopName}`);
        //                         return;
        //                     case "DELETED":
        //                         errorToast("This account has been deleted")
        //                         setLoading(false)
        //                         return;
        //                 }
        //             } else {
        //                 successToast("Login successfully")
        //                 addProfile(res.data.data)
        //             }
        //         }
        //     })
        //     .catch(res => {
        //         errorToast(res.response.data.reason)
        //         setLoading(false)
        //     });