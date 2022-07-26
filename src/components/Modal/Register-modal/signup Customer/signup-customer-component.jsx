
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToasty } from "../../../../context/toastify/ToastContext"
import { useProfile } from "../../../../context/profile/ProfileContext"
import { customerSignup } from "../../../../api/base-user/Auth-api"

import BasicButton from "../../../shared/BasicButton/BasicButton"


export default function SignupCustomer({ switchToggle, close }) {

    const { addProfile } = useProfile()

    const { errorToast, successToast } = useToasty()
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const onSubmit = async data => {
        let info = {
            email: data.email,
            password: data.password,
            confirmPass: data.confirmPassword
        }

        if (info.password !== info.confirmPass) {
            errorToast("Passwords do not match, please re-enter")
            return;
        }

        if (validationEmail(info.email)) {
            setError("Please enter a valid email address.")
            return;
        }

        let accountInfo = { email: info.email, password: data.password }
        setLoading(true)

        let result = await customerSignup(accountInfo ,  errorToast)
        if (result != null) {
            successToast("Account successfully created")
            close()
            addProfile(result)
        } 
        setLoading(false)
    };


    const validationEmail = (em) => {
        let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regx.test(em)) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className="signup-body-wrapper">
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}
            >

                <div className="input-label">
                    <label>Email</label>
                    <input type="email" placeholder="example@email.com"
                        {...register("email", { required: true })}
                        onChange={() => { setError(null) }}
                    />
                    {errors.email?.type === 'required' && <span className="signup-modal-error">Email is required.</span>}
                    {(error != null || error != "") &&
                        (<span className="signup-modal-error">{error}</span>)}
                </div>


                {/* input */}
                <div className="input-label">
                    <label >Password</label>
                    <input type="password" placeholder="Password"
                        {...register("password", { required: true, minLength: 8 })} />
                    {errors.password?.type === 'required' && <span className="signup-modal-error">Password is required.</span>}
                    {errors.password?.type === 'minLength' && <span className="signup-modal-error">Password must be at least 8 characters.</span>}
                </div>

                {/* input */}
                <div className="input-label">
                    <label >Confirm Password</label>
                    <input type="password" placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true, minLength: 8 })} />
                    {errors.confirmPassword?.type === 'required' && <span className="signup-modal-error">Password is required.</span>}
                    {errors.confirmPassword?.type === 'minLength' && <span className="signup-modal-error">Password must be at least 8 characters.</span>}
                </div>
                <div className="mt-3 mt-md-4">
                     <BasicButton type="submit"  disabled={loading} >Sign up</BasicButton>
                </div>

            </form>

            <div className="text mt-4">
                <p>By Creating an account, you agree to the <Link onClick={close} to="/terms">Terms & Conditions</Link> and <Link onClick={close} to="/privacy">Privacy</Link>.</p>
            </div>
            {/* text */}
            <div className="text mt-2">
                <p>Already have an account? <a onClick={switchToggle}>Login</a></p>
            </div>

        </div>
    )
}