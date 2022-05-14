import "./SignUpModal.scss"
import closePng from "../../../../assest/feature/home page images/Close.png"
import { Link } from "react-router-dom";
import { useState } from "react"

export default function SignUpModal({ close, shopname, switchToggle }) {
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
                    <div className="modal-shopname-input">
                        <span>droplinked.com/</span>
                        {(shopname == undefined) ?
                            <input type="text" className="modal-shopname-input-inpt" placeholder="shopname" />
                            :
                            <input type="text" value={shopname} className="modal-shopname-input-inpt" placeholder="shopname" />
                        }
                    </div>

                </div>
                {/* button */}
                <button className="sign-up-btn">Sign up</button>

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