import "./ImsSelect.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import { useState } from "react"

export default function ImsSelect() {
    const [ImsSystem, setImsSystem] = useState(undefined);

    return (
        <RegisterStructure>
            <div className="ims-select-wrapper">
                <div className="header">Select an inventory management system</div>
                <div className="w-100 d-flex justify-content-between" style={{marginTop:"60px"}}>
                    <button className={`ims-btn ${(ImsSystem=="IMS")?"ims-checked-btn":"ims-unchecked-btn"}`}
                        onClick={() => { setImsSystem("IMS") }}
                    >IMS</button>
                    <button className={`ims-btn ${(ImsSystem=="SHOPIFY")?"ims-checked-btn":"ims-unchecked-btn"}`}
                    onClick={() => { setImsSystem("SHOPIFY") }}>Shopify</button>
                </div>
                <div className="d-flex justify-content-between w-100 mt-5">
                    <input className="next-back-btn" value="cancel" />
                    <input className="next-back-btn" value="next" />
                </div>
            </div>
        </RegisterStructure>
    )
}