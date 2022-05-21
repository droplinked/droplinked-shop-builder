import "./ShopInfo.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import ShopInfoAddress from "./address component/ShopInfo.address"
import { useRef, useState } from "react";
import img from "../../../assest/image/default profile/icons8-user-100.png"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";


export default function ShopInfo() {
    const [profileImg, setProfileImg] = useState(undefined)
    const [showAddress, setShowAddress] = useState(false)
    const [addressData, setAddressdata] = useState(undefined)
    const [loading, setLoading] = useState(false)
    let user = JSON.parse(localStorage.getItem('profile'));
    const shopname = user.user.shopName;
    const token = user.jwt;
    let navigate = useNavigate();

    const inputFile = useRef(null);
    const descriptionInp = useRef(null);
    const siteInp = useRef(null);
    const discordInp = useRef(null);
    const twitterInp = useRef(null);
    const instaInp = useRef(null);

    const submitForm = () => {
        setLoading(true);
        const address = JSON.parse(localStorage.getItem('address'));
        if (addressData == undefined) {
            toast.error("Add address please")
            return;
        }

        let shopInfo = {
            description: descriptionInp.current.value,
            social: {
                discordUrl: discordInp.current.value,
                twitter: twitterInp.current.value,
                instagram: instaInp.current.value,
                webUrl: siteInp.current.value
            },
            shopLogo: "",
            shopAddressID: address._id
        }

        axios.put('https://api.droplinked.com/dev/producer/shop/info', shopInfo,
            { headers: { Authorization: 'Bearer ' + token } }
        )
            .then(e => {
                console.log(e.data);
                localStorage.setItem('shopInfo', JSON.stringify(e.data))
                navigate("/register/IMSSelect");
            }
            )
            .catch(e => {
                toast.error(e.response.data.message.message)
                setLoading(true);
            })
    }



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
                    <input type="text" placeholder="about shop" ref={descriptionInp} />
                </div>

                <div className="register-label-input ">
                    <label>Web site</label>
                    <input type="text" placeholder="www.droplinked.io" ref={siteInp} />
                </div>

                <div className="register-label-input ">
                    <label>Discord</label>
                    <input type="text" placeholder="droplinke#0810" ref={discordInp} />
                </div>

                <div className="register-label-input ">
                    <label>Twitter</label>
                    <input type="text" placeholder="twitter.com/username" ref={twitterInp} />
                </div>

                <div className="register-label-input ">
                    <label>Instagram</label>
                    <input type="text" placeholder="instagram/username" ref={instaInp} />
                </div>

                {(addressData == undefined) ?
                    <div className="d-flex justify-content-center">
                        <button className="next-back-btn" style={{ width: "250px", border: "1px solid white", fontSize: "18px" }} onClick={() => setShowAddress(true)}>Add shop address</button>
                    </div>
                    :
                    <div className="address-detail-shopinfo">{`addressLine : ${addressData.line1}  |  city : ${addressData.city}  |  zip : ${addressData.Zip}`}<button className="edit-address-detail" onClick={() => { setShowAddress(true) }}>edit</button></div>
                }
                <div className="d-flex justify-content-between w-100">
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`} >cancel</button>
                    <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                        onClick={submitForm}
                    >next</button>
                </div>
            </>
            }
            {showAddress && <ShopInfoAddress close={closeAddres} addAddressF={addAddressF} addressData={addressData} />}

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

        </div>
    </RegisterStructure>)
}