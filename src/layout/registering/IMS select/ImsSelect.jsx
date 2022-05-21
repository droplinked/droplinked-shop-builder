import "./ImsSelect.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function ImsSelect() {
    const [ImsSystem, setImsSystem] = useState(undefined);
    const [loading, setLoading] = useState(false);
    let user = JSON.parse(localStorage.getItem('profile'));
    const token = user.jwt;
    let navigate = useNavigate();

    const submitType = () => {
        setLoading(true)
        if (ImsSystem == undefined) {
            toast.error("please choose a plan")
            setLoading(false)
        } else {
            const ImsType = { type: ImsSystem }
            axios.post('https://api.droplinked.com/dev/producer/profile/ims', ImsType,
                { headers: { Authorization: 'Bearer ' + token } }
            ).then(res => {
                let profile = {
                    jwt: user.jwt,
                    user: res.data
                }
                localStorage.setItem("profile", JSON.stringify(profile));
                navigate("/register/payment");
            }).catch(e => {
                toast.error(e.response.data.message.message)
                setLoading(false);
            })
        }
    }

    return (
        <RegisterStructure level={"imstype"}>
            <div className="ims-select-wrapper">
                <div className="header">Select an inventory management system</div>
                <div className="w-100 d-flex justify-content-between" style={{ marginTop: "60px" }}>
                    <button className={`ims-btn ${(ImsSystem == "DROPLINKED") ? "ims-checked-btn" : "ims-unchecked-btn"}`}
                        onClick={() => { setImsSystem("DROPLINKED") }}
                    >IMS</button>
                    <button className={`ims-btn ${(ImsSystem == "SHOPIFY") ? "ims-checked-btn" : "ims-unchecked-btn"}`}
                        onClick={() => { setImsSystem("SHOPIFY") }}>Shopify</button>
                </div>
                <div className="d-flex justify-content-between w-100 mt-5">
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}  >cancel</button>
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                        onClick={submitType}
                    >next</button>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </RegisterStructure>
    )
}