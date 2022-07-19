import "./Ims-page-style.scss"

import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { setImsType } from "../../../api/Producer-apis/Shop-api"

export default function RegisterIms() {
    const [ImsSystem, setImsSystem] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const { updateProfile, profile } = useProfile()
    let navigate = useNavigate();

    let user = profile

    const submitType = async () => {

        if (ImsSystem == undefined) {
            toast.error("please choose a plan")
            return;
        }

        setLoading(true)

        let result = await setImsType(ImsSystem)
        if (result == true) {
            toast.success("account created")
            let newUser = { ...user, status: "IMS_TYPE_COMPLETED", imsType: ImsSystem }
            updateProfile(newUser)
            navigate(`/${user.shopName}`);
        } else {
            toast.error(result)
        }

        setLoading(false)      

    }

    return (
        // <RegisterStructure level={"imstype"}>
        <>
            <div className="ims-select-wrapper">
                <div className="header">Select an inventory management system</div>
                <div className="w-100 d-flex flex-column justify-content-center" style={{ marginTop: "60px" }}>
                    <button className={`ims-btn ${(ImsSystem == "DROPLINKED") ? "ims-checked-btn" : "ims-unchecked-btn"}`}
                        onClick={() => { setImsSystem("DROPLINKED") }}
                    >DIMST</button>
                    <button disabled={true} className={`ims-btn ${(ImsSystem == "SHOPIFY") ? "ims-checked-btn" : "ims-unchecked-btn"}`}
                        onClick={() => { setImsSystem("SHOPIFY") }}>Shopify</button>
                </div>
                <div className="d-flex justify-content-between w-100 mt-5">
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                        onClick={() => { navigate("/register/shopInfo") }}
                    >Back</button>
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                        onClick={submitType}
                    >Submit</button>
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
        </>
        //  </RegisterStructure>
    )
}