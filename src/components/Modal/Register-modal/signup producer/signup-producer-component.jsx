
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react"
import { useForm } from "react-hook-form";
import { toastValue } from "../../../../context/toastify/ToastContext"
import { producerSignup } from "../../../../api/Producer-apis/Auth-api"
import { isValidEmail } from "../../../../utils/validations/emailValidation"

export default function SignupProducer({ close, shopname, switchToggle }) {

    const { successToast, errorToast } = useContext(toastValue)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [shopNameError, setShopNameError] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();


    const onSubmit = async data => {

        let info = {
            email: data.email,
            password: data.password,
            confirmPass: data.confirmPassword,
            shopName: data.shopname
        }

        if (info.password !== info.confirmPass) {
            errorToast("Password and confirm password don't match.")
            return;
        }

        if (isValidEmail(info.email) == false) {
            setError("Please enter a valid email address.")
            return;
        }
        if (!(/^[A-Za-z0-9_]*$/.test(data.shopname))) {
            setShopNameError(true);
            return;
        }

        setLoading(true)

        let result = await producerSignup(info)
        if (result == true) {
            successToast("Your account has been successfully created.");
            close()
            navigate("/emailConfirmation");
        } else {
            errorToast(result);
        }
        setLoading(false)
    };




    return (

        <div className="signup-body-wrapper">
            {/* header */}

            <form onSubmit={handleSubmit(onSubmit)}
                onChange={() => { if (loading) { setLoading(false) } }}
                style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}>
                {/* inout */}
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

                {/* input */}
                <div className="input-label">
                    <label >Username</label>
                    <div className="modal-shopname-input">
                        <span>droplinked.com/</span>
                        {(shopname == undefined) ?
                            <input type="text" className="modal-shopname-input-inpt" placeholder="Username"
                                {...register("shopname", { required: true })}
                                onChange={() => { setShopNameError(false) }}
                            />
                            :
                            <input type="text" value={shopname} className="modal-shopname-input-inpt" placeholder="Username"
                                {...register("shopname", { required: true })}
                                onChange={() => { setShopNameError(false) }}
                            />
                        }
                    </div>
                    {errors.shopname?.type === 'required' && <span className="signup-modal-error">Username is required.</span>}
                    {shopNameError && (<span className="signup-modal-error">{"Username can contain letters (a-z), numbers (0-9) and underscores."}</span>)}
                </div>

                {/* button */}
                <button className="sign-up-btn" type="submit" disabled={loading}
                    style={{ backgroundColor: `${(loading == true) ? "#4A4A4A" : ""}` }}>Sign up</button>
                {/* {(loading)
                        ?
                        <button style={{ backgroundColor: "#b3b3b3" }} >Sign up</button>
                        :
                        <button className="sign-up-btn"  ></button>
                    } */}

            </form>

            {/* text */}
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