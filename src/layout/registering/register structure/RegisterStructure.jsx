import "./RegisterStructure.scss"

import { Outlet ,useLocation } from "react-router-dom";

export default function RegisterStructure() {

    let location = useLocation().pathname.split("/")[2];

    return (
        <div className="Register-structure-wrapper">
            <div className="Register-structure-body">
                <div className="Register-structure-sidebar">
                    <div className={`item ${(location == "personalinfo") ? "selecteditem" : "unselecteditem"}`}>Personal info</div>
                    <div className={`item ${(location == "shopinfo") ? "selecteditem" : "unselecteditem"}`}>Shop info</div>
                    <div className={`item ${(location == "imstype") ? "selecteditem" : "unselecteditem"}`}>Inventory</div>
                    {/* <div className={`item ${(level=="payment")?"selecteditem":"unselecteditem"}`}>add cart</div> */}
                </div>
                 <div className="Register-structure-content"><Outlet /></div>
            </div>
        </div>
    )
}