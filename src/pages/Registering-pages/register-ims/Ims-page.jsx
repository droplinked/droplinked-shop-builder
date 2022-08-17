import "./Ims-page-style.scss"

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { setImsType } from "../../../api/producer/Shop-api"
import { useToasty } from "../../../context/toastify/ToastContext"

export default function RegisterIms() {
    const [ImsSystem, setImsSystem] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const { updateProfile, profile } = useProfile()
    const { successToast , errorToast } = useToasty()

    let navigate = useNavigate();

    let user = profile

    const submitType = async () => {

        if (ImsSystem == undefined) {
            errorToast("Please select a plan option")
            return;
        }

        setLoading(true)

        let result = await setImsType(ImsSystem)
        if (result == true) {
            successToast("New account created")
            let newUser = { ...user, status: "IMS_TYPE_COMPLETED", imsType: ImsSystem }
            updateProfile(newUser)
            navigate(`/${user.shopName}`);
        } else {
            errorToast(result)
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
                        onClick={() => { navigate("/register/shop-info") }}
                    >Back</button>
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                        onClick={submitType}
                    >Submit</button>
                </div>
            </div>
        </>
        //  </RegisterStructure>
    )
}