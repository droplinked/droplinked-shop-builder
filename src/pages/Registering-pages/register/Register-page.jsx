import "./Register-page-style.scss"

import { Outlet ,useLocation } from "react-router-dom";

export default function RegisterPage() {

    let location = useLocation().pathname.split("/")[2];

    return (
        <div className="Register-structure-wrapper">
            <div className="Register-structure-body">
                <div className="Register-structure-sidebar">
                    {/* <div className={`item ${(location == "personalInfo") ? "selecteditem" : "unselecteditem"}`}>Personal info</div> */}
                    <div className={`item ${(location == "shopInfo") ? "selecteditem" : "unselecteditem"}`}>Shop info</div>
                    <div className={`item ${(location == "IMSSelect") ? "selecteditem" : "unselecteditem"}`}>Inventory</div>
                </div>
                 <div className="Register-structure-content"><Outlet /></div>
            </div>
        </div>
    )
}