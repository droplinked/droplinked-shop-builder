import "./PersonalInfo.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import { useRef, useState } from "react";
import img from "../../../assest/image/default profile/icons8-user-100.png"

export default function PersonalInfo() {
    const [profileImg, setProfileImg] = useState(undefined)
    const inputFile = useRef(null);

    const chooseFile = () => {
        inputFile.current.click();
    };
    const enterImage = (e) => {
        let img = URL.createObjectURL(e.target.files[0]);
        setProfileImg(img)
    }



    return (
        <RegisterStructure level={"personalinfo"}>
            <div className="register-personalinfo-wrapper">

                <div className="input-perosnal-image" onClick={chooseFile}
                    style={{ backgroundImage: `url(${(profileImg == undefined) ? img : profileImg})` }}
                >
                    <input className="d-none" type="file" ref={inputFile}
                        onClick={enterImage}
                    />
                </div>
                <form>
                    <div className="d-flex justify-content-between w-100" style={{ maxWidth: "100%" }}>
                        <div className="register-label-input" style={{ width: "45%" }}>
                            <label>First name</label>
                            <input type="text" placeholder="first name" />
                        </div>
                        <div className="register-label-input" style={{ width: "45%" }}>
                            <label>Last name</label>
                            <input type="text" placeholder="last name" />
                        </div>
                    </div>
                    <div className="register-label-input ">
                        <label>Email</label>
                        <input type="email" placeholder="email" />
                    </div>
                    <div className="register-label-input ">
                        <label>Phone number</label>
                        <input type="number" placeholder="phone number" />
                    </div>
                    <div className="d-flex justify-content-end w-100">
                        <input type="submit" className="next-back-btn" />
                    </div>
                </form>
            </div>
        </RegisterStructure>
    )
}