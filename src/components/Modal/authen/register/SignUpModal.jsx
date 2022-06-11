import "./SignUpModal.scss"

import closePng from "../../../../assest/feature/home page images/Close.png"

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react"
import { useForm } from "react-hook-form";
import { PostWithoutToken } from "../../../../sevices/functoinal-service/CallApiService"
import { toastValue } from "../../../../sevices/context/Toast-context"

export default function SignUpModal({ close, shopname, switchToggle }) {

    const { successToast, errorToast } = useContext(toastValue)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const onSubmit = data => {
        setLoading(true)

        let info = {
            email: data.email,
            password: data.password,
            confirmPass: data.confirmPassword,
            shopName: data.shopname
        }

        if (info.password !== info.confirmPass) {
            errorToast("password not match")
            return;
        }

        PostWithoutToken("/producer/signup", info, 
        (status, value) => {
            if (status) {
                successToast("success");
                close()
                localStorage.setItem('registerEmail', JSON.stringify(info.email))
                navigate("/emailConfirmation");
            } else {
                errorToast(value);
                setLoading(false)
            }
        }
        )
    };





    return (
        <div className="signup-wraper">
            <div className="signup-body">

                {/* header */}
                <div className="title">Create a free account
                    <img className="close-btn" src={closePng} alt="" onClick={close} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    onChange={() => { if (loading) { setLoading(false) } }}
                    style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}>
                    {/* inout */}
                    <div className="input-label">
                        <label>Email</label>
                        <input type="email" placeholder="example@email.com"
                            {...register("email", { required: true })} />
                        {errors.email?.type === 'required' && <span className="signup-modal-error">email is required</span>}
                    </div>

                    {/* input */}
                    <div className="input-label">
                        <label >Password</label>
                        <input type="password" placeholder="Password"
                            {...register("password", { required: true, minLength: 8 })} />
                        {errors.password?.type === 'required' && <span className="signup-modal-error">password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="signup-modal-error">password must be at least 8 characters</span>}
                    </div>

                    {/* input */}
                    <div className="input-label">
                        <label >Confirm Password</label>
                        <input type="password" placeholder="Confirm Password"
                            {...register("confirmPassword", { required: true, minLength: 8 })} />
                        {errors.confirmPassword?.type === 'required' && <span className="signup-modal-error">password is required</span>}
                        {errors.confirmPassword?.type === 'minLength' && <span className="signup-modal-error">password must be at least 8 characters</span>}
                    </div>

                    {/* input */}
                    <div className="input-label">
                        <label >Shop domain</label>
                        <div className="modal-shopname-input">
                            <span>droplinked.com/</span>
                            {(shopname == undefined) ?
                                <input type="text" className="modal-shopname-input-inpt" placeholder="shopname"
                                    {...register("shopname", { required: true })} />
                                :
                                <input type="text" value={shopname} className="modal-shopname-input-inpt" placeholder="shopname"
                                    {...register("shopname", { required: true })} />
                            }
                        </div>
                        {errors.shopname?.type === 'required' && <span className="signup-modal-error">shopname is required</span>}
                    </div>

                    {/* button */}
                    {(loading)
                        ?
                        <button className="sign-up-btn" style={{ backgroundColor: "#b3b3b3" }} >Sign up</button>
                        :
                        <button className="sign-up-btn" type="submit" >Sign up</button>
                    }

                </form>

                {/* text */}
                <div className="text mt-4">
                    <p>By Creating an account, you agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy</Link>.</p>
                </div>
                {/* text */}
                <div className="text mt-2">
                    <p>Already have an account? <a onClick={switchToggle}>Login</a></p>
                </div>
            </div>
        </div>
    )
}