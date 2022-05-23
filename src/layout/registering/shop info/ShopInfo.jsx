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


export default function ShopInfo() {
    const [profileImg, setProfileImg] = useState(undefined)
    const [showAddress, setShowAddress] = useState(false)
    const [addressData, setAddressdata] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false);
    const { updateProfile, profile } = useProfile()
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

    // useEffect(()=>{
    //     if(user.shopAddressID){
    //     axios.get(`https://api.droplinked.com/dev/producer/shop/address/${user.shopAddressID}`,
    //     {headers: { Authorization: 'Bearer ' + token } })
    //     .then(e => console.log(e)) 
    // }
    // })

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
                setLoading(true);
            })
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
        axios.post('http://18.215.217.156:2021/upload', formData)
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
                <div className="input-perosnal-image d-flex justify-content-center align-items-center" onClick={chooseFile} style={{ backgroundImage: `url(${(profileImg == undefined) ? img : profileImg})` }}>
                    <input className="d-none" type="file" ref={inputFile} onChange={changeImage} />
                    {(uploadingImage) &&
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }
                </div>

                <div className="register-label-input ">
                    <label>ShopName</label>
                    <input type="text" placeholder="" value={`droplinked.io/${shopname}`} readonly />
                </div>

                <div className="register-label-input ">
                    <label>about your shop</label>
                    <input type="text" placeholder="about shop" ref={descriptionInp} value={(user.description)?user.description:""} />
                </div>

                <div className="register-label-input ">
                    <label>Web site</label>
                    <input type="text" placeholder="www.droplinked.io" ref={siteInp} value={(user.web)?user.web:""}/>
                </div>

                <div className="register-label-input ">
                    <label>Discord</label>
                    <input type="text" placeholder="droplinke#0810" ref={discordInp} value={(user.discord)?user.discord:""}/>
                </div>

                <div className="register-label-input ">
                    <label>Twitter</label>
                    <input type="text" placeholder="twitter.com/username" ref={twitterInp} value={(user.twitter)?user.twitter:""}/>
                </div>

                <div className="register-label-input ">
                    <label>Instagram</label>
                    <input type="text" placeholder="instagram/username" ref={instaInp} value={(user.instagram)?user.instagram:""}/>
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