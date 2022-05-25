import "./ShopInfo.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import ShopInfoAddress from "./address component/ShopInfo.address"
import { useEffect, useRef, useState } from "react";
import img from "../../../assest/image/default profile/icons8-user-100.png"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../../sevices/hooks/useProfile"
import { ReactComponent as IconMenu } from "../assest/icons8-delete.svg"


export default function ShopInfo() {
    const [profileImg, setProfileImg] = useState(undefined)
    const [showAddress, setShowAddress] = useState(false)
    const [addressData, setAddressdata] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false);
    const { updateProfile, profile } = useProfile()
    let x = 1;
    let user = profile
    const shopname = user.shopName;
    const token = JSON.parse(localStorage.getItem('token'));
    let navigate = useNavigate();

    const inputFile = useRef(null);
    const descriptionInp = useRef(null);
    const siteInp = useRef(null);
    const discordInp = useRef(null);
    const twitterInp = useRef(null);
    const instaInp = useRef(null);


    useEffect(() => {
        if (user.shopAddressID) {
            axios.get(`https://api.droplinked.com/dev/producer/shop/address/${user.shopAddressID}`,
                { headers: { Authorization: 'Bearer ' + token } })
                .then(e => setAddressdata(e.data.addressBook))
        }
    }, [x])

    const submitForm = () => {
        setLoading(true);

        const address = JSON.parse(localStorage.getItem('address'));

        if (!address) {
            toast.error("Add address please")
            setLoading(false);
            return;
        }

        if (addressData == undefined) {
            toast.error("Add address please")
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
            shopLogo: (profileImg == undefined) ? profileImg : "",
            shopAddressID: address._id
        }

        axios.put('https://api.droplinked.com/dev/producer/shop/info', shopInfo,
            { headers: { Authorization: 'Bearer ' + token } }
        )
            .then(res => {
                updateProfile(res.data)
                navigate("/register/IMSSelect");
            }
            )
            .catch(e => {
                toast.error(e.response.data.message.message)
                setLoading(false);
            })
        setLoading(false);
    }



    const chooseFile = () => {
        inputFile.current.click();
    };

    const changeImage = (e) => {
        setUploadingImage(true);
        const file = e.target.files[0];

        if (file.size > 200000) {
            toast.error("File size exceeded (Max: 200 kb)");
            setUploadingImage(false);
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/jpg"
        ) {
            toast.error("File type not supported");
            setUploadingImage(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        axios.post('https://cdn.droplinked.com/upload', formData)
            .then(e => {
                setUploadingImage(false);
                toast.success(e.data.message);
                setProfileImg(e.data.small)
            })
            .catch(e => {
                toast.error(e.response.data.message);
                setUploadingImage(false);
                return;
            })
        setUploadingImage(false);


    }
    const closeAddres = () => {
        setShowAddress(false)
    }

    const deleteImage = () => {
        user = { ...user, shopLogo: "" }
        localStorage.setItem('profile', JSON.stringify(user));
        setProfileImg(undefined);
    }


    const addAddressF = (e) => {
        setAddressdata(e)
    }

    return (<RegisterStructure level={"shopinfo"}>
        <div className="register-shopinfo-wrapper">
            {(!showAddress) && <>
                <div className="input-perosnal-image d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${(profileImg == undefined) ? img : profileImg})` }}>
                    <input className="d-none" type="file" ref={inputFile} onChange={changeImage} />
                    {(uploadingImage) &&
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }
                    <div className="add-image-hov"
                        onClick={chooseFile}>+</div>
                    {(profileImg == undefined || profileImg == "") ? <></> :
                        <div className="delet-image-icon" onClick={deleteImage}>
                            <IconMenu style={{ width: "100%", height: "100%" }} />
                        </div>
                    }
                </div>

                <div className="register-label-input ">
                    <label>shopname</label>
                    <input type="text" placeholder="" value={`droplinked.io/${shopname}`} readonly />
                </div>

                <div className="register-label-input ">
                    <label>about your shop</label>
                    <textarea id="w3review" name="w3review" rows="4" cols="50"
                        type="text" placeholder="describe your store" ref={descriptionInp} defaultValue={user.description || ""}
                    >


                    </textarea>
                    {/* <input type="text" placeholder="describe your store" ref={descriptionInp} defaultValue={user.description || ""} /> */}
                </div>

                {/* <div className="register-label-input ">
                    <label>about your shop</label>
                    <input type="text" placeholder="describe your store" ref={descriptionInp} defaultValue={user.description || ""} />
                </div> */}

                <div className="register-label-input ">
                    <label>website</label>
                    <input type="text" placeholder="www.droplinked.com" ref={siteInp} defaultValue={user.web || ""} />
                </div>

                <div className="register-label-input ">
                    <label>discord</label>
                    <input type="text" placeholder="droplinke#0810" ref={discordInp} defaultValue={user.discord || ""} />
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
                        <button className="next-back-btn" style={{ width: "250px", border: "1px solid white", fontSize: "18px" }} onClick={() => setShowAddress(true)}>Add shop address</button>
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