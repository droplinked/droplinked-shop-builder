import "./LoginModal.style.scss"
import closePng from "../../../../assest/feature/home page images/Close.png"
import { useForm } from "react-hook-form";

export default function LoginModal({ close, switchToggle }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

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
                        <input type="email" placeholder="Shopname"
                            {...register("email", { required: true })} />
                    </div>
                    {errors.email?.type === 'required' && <span className="signup-modal-error">email is required</span>}

                    <div className="input-label">
                        <label >Password</label>
                        <input type="password" placeholder="Password"
                            {...register("password", { required: true })} />
                    </div>
                    {errors.password?.type === 'required' && <span className="signup-modal-error">password is required</span>}
                    <input className="submit-login-modal" value="Login" type="submit" />
                </form>

                <div className="text mt-4">
                    <p><a>Forgot password ?</a></p>
                </div>
                <div className="text mt-2">
                    <p>Don’t have an account ? <a onClick={switchToggle}>Register now</a></p>
                </div>
            </div>
        </div>

    </>)
}