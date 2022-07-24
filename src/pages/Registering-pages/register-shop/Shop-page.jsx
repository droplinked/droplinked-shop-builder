import "./Shop-page-style.scss"

import ShopInfoAddress from "./address component/ShopInfo.address"

import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { BASE_URL } from "../../../api/BaseUrl"
import { toastValue } from "../../../context/toastify/ToastContext"
import { updateShopApi } from "../../../api/producer/Shop-api"

import InputImage from "../../../components/shared/InputImage/InputImage"


export default function RegisterShop() {
    const [profileImg, setProfileImg] = useState("")
    const [showAddress, setShowAddress] = useState(false)
    const [addressData, setAddressdata] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const {  profile } = useProfile()
    const { errorToast } = useContext(toastValue)

    let x = 1;
    let user = profile

    const shopname = user.shopName;
    const token = JSON.parse(localStorage.getItem('token'));
    let navigate = useNavigate();


    const descriptionInp = useRef(null);
    const siteInp = useRef(null);
    const discordInp = useRef(null);
    const twitterInp = useRef(null);
    const instaInp = useRef(null);




    useEffect(() => {
        if (user.shopAddressID) {
            axios.get(BASE_URL + `/producer/shop/address/${user.shopAddressID}`,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(e => setAddressdata(e.data.addressBook))
        }
    }, [x])

    const submitForm = async () => {


        const address = JSON.parse(localStorage.getItem('address'));

        if (!address) {
            errorToast("Add address please")
            setLoading(false);
            return;
        }

        if (addressData == undefined) {
            errorToast("Add address please")
            setLoading(false);
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
            shopLogo: profileImg,
            shopAddressID: address._id
        }
        setLoading(true);
        let result = await updateShopApi(shopInfo)

        if (result.status == 'success') {
            localStorage.setItem("shop", JSON.stringify(result.data.shop));
            navigate("/register/IMSSelect");
        } else {
            errorToast(result.reason)
        }
        setLoading(false);
    }



    const closeAddres = () => {
        setShowAddress(false)
    }


    const addAddressF = (e) => {
        setAddressdata(e)
    }

    return (

        <>
            <div className="register-shopinfo-wrapper">
                {(!showAddress) && <>

                    <InputImage  image={profileImg} setImage={setProfileImg} />

                    <div className="register-label-input ">
                        <label>domain</label>
                        <input type="text" placeholder="" value={`droplinked.io/${shopname}`} readOnly />
                    </div>

                    <div className="register-label-input ">
                        <label>about your shop</label>
                        <textarea id="w3review" name="w3review" rows="4" cols="50"
                            type="text" ref={descriptionInp} defaultValue={user.description || ""} >
                        </textarea>
                        {/* <input type="text" placeholder="describe your store" ref={descriptionInp} defaultValue={user.description || ""} /> */}
                    </div>

                    {/* <div className="register-label-input ">
                    <label>about your shop</label>
                    <input type="text" placeholder="describe your store" ref={descriptionInp} defaultValue={user.description || ""} />
                </div> */}

                    <div className="register-label-input ">
                        <label>website</label>
                        <input type="text" ref={siteInp} defaultValue={user.web || ""} />
                    </div>

                    <div className="register-label-input ">
                        <label>discord</label>
                        <input type="text" placeholder="username" ref={discordInp} defaultValue={user.discord || ""} />
                    </div>

                    <div className="register-label-input ">
                        <label>twitter</label>
                        <input type="text" placeholder="username" ref={twitterInp} defaultValue={user.twitter || ""} />
                    </div>

                    <div className="register-label-input ">
                        <label>instagram</label>
                        <input type="text" placeholder="username" ref={instaInp} defaultValue={user.instagram || ""} />
                    </div>

                    {(addressData == undefined) ?
                        <div className="d-flex justify-content-center">
                            <button className="next-back-btn" style={{ width: "250px", border: "1px solid white", fontSize: "18px" }} onClick={() => setShowAddress(true)}>Add address</button>
                        </div>
                        :
                        <div className="address-detail-shopinfo">
                            <span>{addressData.country} - {addressData.city}</span>
                            <span>{addressData.line1 || addressData.addressLine1}</span>
                            <span>{addressData.Zip || addressData.zip}</span>
                            <div className="m-2 d-flex justify-content-between">
                                <button className="edit-address-detail" onClick={() => { setShowAddress(true) }}>edit</button>
                                <button className="edit-address-detail" style={{ color: "red" }} onClick={() => { setAddressdata(undefined) }}>delete</button></div>
                        </div>
                    }

                    <div className="d-flex justify-content-between w-100">
                        <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                            onClick={() => { navigate("/register/personalInfo") }}
                        >back</button>
                        <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
                            onClick={submitForm}
                        >next</button>
                    </div>
                </>
                }
                {showAddress && <ShopInfoAddress close={closeAddres} addAddressF={addAddressF} addressData={addressData} />}

            </div>
        </>
        // </RegisterStructure>
    )
}