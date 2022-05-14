import "./LoginModal.style.scss"
import closePng from "../../../../assest/feature/home page images/Close.png"

export default function LoginModal({close , switchToggle}) {

    return (<>
        <div className="login-modal-wraper">
            <div className="login-modal-body">
                <div className="title">Login
                    <img className="close-btn" src={closePng} alt="" onClick={close} />
                </div>

                <div className="input-label">
                    <label>Shopname</label>
                    <input type="email" placeholder="Shopname" />
                </div>

                <div className="input-label">
                    <label >Password</label>
                    <input type="password" placeholder="Password" />
                </div>

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