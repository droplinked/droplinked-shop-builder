import "./ShopInfo.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import ShopInfoAddress from "./address component/ShopInfo.address"
import { useRef, useState } from "react";
import img from "../../../assest/image/default profile/icons8-user-100.png"

export default function ShopInfo() {
    const [profileImg, setProfileImg] = useState(undefined)
    const [showAddress, setShowAddress] = useState(false)
    const [addressData, setAddressdata] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const shopname = JSON.parse(localStorage.getItem('profile')).user.shopName;

    const inputFile = useRef(null);
    const chooseFile = () => {
        inputFile.current.click();
    };
    const enterImage = (e) => {
        let img = URL.createObjectURL(e.target.files[0]);
        setProfileImg(img)
    }
    const closeAddres = () => {
        setShowAddress(false)
    }

    const addAddressF = (e) => {
        setAddressdata(e)
    }
    return (<RegisterStructure level={"shopinfo"}>
        <div className="register-shopinfo-wrapper">
            {(!showAddress) && <>
                <div className="input-perosnal-image" onClick={chooseFile} style={{ backgroundImage: `url(${(profileImg == undefined) ? img : profileImg})` }}>
                    <input className="d-none" type="file" ref={inputFile} onClick={enterImage} />
                </div>

                <div className="register-label-input ">
                    <label>ShopName</label>
                    <input type="text" placeholder="" value={`droplinked.io/${shopname}`} readonly />
                </div>

                <div className="register-label-input ">
                    <label>about your shop</label>
                    <input type="text" placeholder="about shop" />
                </div>

                <div className="register-label-input ">
                    <label>Web site</label>
                    <input type="text" placeholder="www.droplinked.io" />
                </div>

                <div className="register-label-input ">
                    <label>Discord</label>
                    <input type="text" placeholder="droplinke#0810" />
                </div>

                <div className="register-label-input ">
                    <label>Twitter</label>
                    <input type="text" placeholder="twitter.com/username" />
                </div>

                <div className="register-label-input ">
                    <label>Instagram</label>
                    <input type="text" placeholder="instagram/username" />
                </div>

                {(addressData == undefined )?
                    <div className="d-flex justify-content-center">
                        <button className="next-back-btn" style={{ width: "250px" , border:"1px solid white" , fontSize:"18px" }} onClick={() => setShowAddress(true)}>Add shop address</button>
                    </div>
                :
                <div className="address-detail-shopinfo">{`addressLine : ${addressData.line1}  |  city : ${addressData.city}  |  zip : ${addressData.Zip}`}<button className="edit-address-detail" onClick={()=>{setShowAddress(true)}}>edit</button></div>  
                }
                <div className="d-flex justify-content-between w-100">
                    <button className={`next-back-btn ${(loading?"loading-btn":"non-loading-btn")}`} >cancel</button>
                    <button className={`next-back-btn ${(loading?"loading-btn":"non-loading-btn")}`} >next</button>
                </div>
            </>
            }
            {showAddress && <ShopInfoAddress close={closeAddres} addAddressF={addAddressF} addressData={addressData} />}



        </div>
    </RegisterStructure>)
}