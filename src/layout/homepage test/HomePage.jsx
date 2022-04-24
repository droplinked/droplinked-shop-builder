import "./HomePage.scss"
import figmaImage1 from "../../assest/feature/home page images/figmaImage1.png"
//import HomeInput from "../homepage/input-homepage/HomeInput"
import alertIcon from "../../assest/feature/home page images/alert.png"

import { useState } from "react"
import EmailModal from "./modal/EmailModal"


export default function HomePage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>
        <div className="bod">
            {/* inputs */}
            <div className="child d-flex rg">
                <div className="input-form w-100">
                    <div className="discove">Discover, create <br />&amp; connect.</div>
                    <div className="earn">Earn money for sharing collections.</div>
                    <div className="signup-wrapper d-flex justify-content-between">
                        <div className="d-flex justify-content-start" style={{ width: "75%", maxWidth: "75%"}}>
                            <span className="item-span">droplinked.com/</span>
                            <input type="text" placeholder="username" className="item-input" />
                        </div>
                        <div className="d-flex" style={{ width: "25%" }}>
                            <button className="item-button" onClick={handleShow} >Sign up</button>
                        </div>
                    </div>
                    <div className="alert-wrap d-none">
                        <img className="ratio ratio-1x1" src={alertIcon} alt="" />
                        <span>URL already in use. Please try another. If you are the owner login here</span>
                    </div>
                </div>
            </div>
            {/* inputs */}

            {/* image */}
            <div className="child">
                <img className="ratio ratio-1x1 img-r" src={figmaImage1} alt="" />
            </div>
            {/* image */}
        </div>
        {show && <EmailModal close={handleClose} />}
    </>)
}