import "./EmailModal.scss"

function EmailModal({close}) {

    return (<>
        <div className="modal-wrap">
            <div className="modal-body d-flex justify-content-center align-item-center">
                <div className="close-wrap">
                    <div className="close rounded-circle" onClick={close}>
                        <span>&times;</span>
                    </div>
                </div>
                <div className="modal-contain d-flex flex-column">

                    {/* header */}
                    <div className="modal-headerr d-flex justify-content-center align-item-center">
                        <p>Create a free account</p>
                    </div>
                    {/* header */}

                    {/* form */}
                    <div className="modal-form d-flex flex-column">
                        <div className="label">Email</div>
                        <input type="email" className="modal-input" placeholder="example@email.com" />
                        <button className="modal-button"><p>Sign up</p></button>
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