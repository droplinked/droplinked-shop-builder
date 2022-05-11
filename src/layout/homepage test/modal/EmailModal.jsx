import "./EmailModal.scss"
import closePng from "../../../assest/feature/home page images/Close.png"
import { useState, useEffect } from "react";

function EmailModal({ close, name, clear }) {

    const [email, setEmail] = useState("");


    function submitform() {
        if (email != "" && name != "") {
            fetch(
                "https://uui8anv8g0.execute-api.eu-central-1.amazonaws.com/latest/register",
                {
                    method: "POST",
                    body: JSON.stringify({ name: name, email: email }),
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((res) => res.json())
                .then((json) => {
                    console.log(json.user);
                });
        }
        clear();
        setEmail("");
        close();
    }



    return (<>
        <div className="modal-wrap">
            <div className="modal-body d-flex justify-content-center align-item-center">

                <div className="modal-contain d-flex flex-column">


                    {/* header */}
                    <div className="modal-headerr d-flex justify-content-center align-item-center">
                        <p>Create a free account</p>
                        <div className="close-wrap">
                            <img className="close rounded-circle ratio ratio-1x1" src={closePng} alt="closePng" onClick={close} />
                        </div>
                    </div>
                    {/* header */}

                    {/* form */}
                    <div className="modal-form d-flex flex-column">
                        <div className="label">Email</div>
                        <input type="email" className="modal-input" placeholder="example@email.com"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                        <button className="modal-button"
                            onClick={() => { submitform() }}
                        >Sign up</button>
                    </div>
                    {/* form */}

                    {/* footer */}
                    <div className=" d-flex justify-content-center align-items-center"
                        style={{ width: "100%" }}
                    >
                        <div
                            style={{ height: "40px", alignItems: "center", marginTop: "20px" }}>
                            <div className="question">Already have an account?</div>
                            <div className="login">Login</div>
                        </div>
                    </div>
                    {/* footer */}

                </div>

            </div>
        </div>
    </>)
}

export default EmailModal