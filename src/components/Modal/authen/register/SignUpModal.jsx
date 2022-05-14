import "./SignUpModal.scss"
import closePng from "../../../../assest/feature/home page images/Close.png"

export default function SignUpModal({ close, shopname ,switchToggle }) {

    return (
        <div className="signup-wraper">
            <div className="signup-body">

                {/* header */}
                <div className="title">Create a free account
                    <img className="close-btn" src={closePng} alt="" onClick={close} />
                </div>

                {/* inout */}
                <div className="input-label">
                    <label>Email</label>
                    <input type="email" placeholder="example@email.com" />
                </div>

                {/* input */}
                <div className="input-label">
                    <label >Password</label>
                    <input type="password" placeholder="Password" />
                </div>
                
                {/* input */}
                <div className="input-label">
                    <label >Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" />
                </div>

                {/* input */}
                <div className="input-label">
                    <label >Shop domain</label>
                    {(shopname == undefined) ?
                        <input type="text" placeholder="droplinked.io/shopname" readonly />
                        :
                        <input type="text" value={`droplinked.io/${shopname}`} placeholder="droplinked.io/shopname" readonly />
                    }
                </div>
                {/* button */}
                <button className="sign-up-btn">Sign up</button>

                {/* text */}
                <div className="text mt-4">
                    <p>By Creating an account, you agree to the <a>Terms & Conditions</a> and <a>Privacy</a>.</p>
                </div>
                {/* text */}
                <div className="text mt-2">
                    <p>Already have an account? <a onClick={switchToggle}>Login</a></p>
                </div>
            </div>
        </div>
    )
}