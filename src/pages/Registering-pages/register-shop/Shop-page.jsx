// import "./Shop-page-style.scss"

// import ShopInfoAddress from "./address component/ShopInfo.address"

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProfile } from "../../../context/profile/ProfileContext"
// import { toastValue } from "../../../context/toastify/ToastContext"
// import { updateShopApi } from "../../../api/producer/Shop-api"

// import InputImage from "../../../components/shared/InputImage/InputImage"


// export default function RegisterShop() {
//     // profile image state
//     const [profileImg, setProfileImg] = useState("")
//     // shop description state
//     const [description, setDescription] = useState("")
//     // website address state
//     const [website, setWebsite] = useState("")
//     // discord state
//     const [discord, setDiscord] = useState("")
//     // twitter state
//     const [twitter, setTwitter] = useState("")
//     // insta state
//     const [instagram, setInstagram] = useState("")

//     const [showAddress, setShowAddress] = useState(false)
//     const [addressData, setAddressdata] = useState(undefined)
//     const [loading, setLoading] = useState(false)
//     const { profile } = useProfile()
//     const { errorToast } = useContext(toastValue)
//     let navigate = useNavigate();

//     let user = profile
//     const shopname = user.shopName;

//     const submitForm = async () => {

//         const address = JSON.parse(localStorage.getItem('address'));

//         if (!address) {
//             errorToast("Address is required")
//             setLoading(false);
//             return;
//         }

//         if (addressData == undefined) {
//             errorToast("Address is required")
//             setLoading(false);
//             return;
//         }

//         let shopInfo = {
//             description: description,
//             social: {
//                 discordUrl: discord,
//                 twitter: twitter,
//                 instagram: instagram,
//                 webUrl: website
//             },
//             shopLogo: profileImg,
//             shopAddressID: address._id
//         }
//         setLoading(true);
//         let result = await updateShopApi(shopInfo)

//         if (result.status == 'success') {
//             localStorage.setItem("shop", JSON.stringify(result.data.shop));
//             navigate("/register/IMSSelect");
//         } else {
//             errorToast(result.reason)
//         }
//         setLoading(false);
//     }



//     const closeAddres = () => {
//         setShowAddress(false)
//     }


//     const addAddressF = (e) => {
//         setAddressdata(e)
//     }


//     // changes inputs 

//     const changeDescription = (e) => {
//         setDescription(e.target.value)
//     }

//     const changeWebsite = (e) => {
//         setWebsite(e.target.value)
//     }

//     const changeDiscord = (e) => {
//         setDiscord(e.target.value)
//     }

//     const changeTwitter = (e) => {
//         setTwitter(e.target.value)
//     }

//     const changeInstagram = (e) => {
//         setInstagram(e.target.value)
//     }

//     return (

//         <>
//             <div className="register-shopinfo-wrapper">
//                 {(!showAddress) && <>

//                     <InputImage image={profileImg} setImage={setProfileImg} />

//                     <div className="register-label-input ">
//                         <label>Shop name</label>
//                         <input
//                             type="text"
//                             placeholder="Shop name"
//                             value={description}
//                             onChange={changeDescription}
//                         />
//                     </div>

//                     <div className="register-label-input ">
//                         <label>Domain</label>
//                         <input type="text" placeholder="" value={`droplinked.io/${shopname}`} readOnly />
//                     </div>


//                     <div className="register-label-input ">
//                         <label>Website</label>
//                         <input
//                             type="text"
//                             placeholder="www.example.com"
//                             value={website}
//                             onChange={changeWebsite}
//                         />
//                     </div>

//                     <div className="register-label-input ">
//                         <label>Discord</label>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={discord}
//                             onChange={changeDiscord}
//                         />
//                     </div>

//                     <div className="register-label-input ">
//                         <label>Twitter</label>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={twitter}
//                             onChange={changeTwitter}
//                         />
//                     </div>

//                     <div className="register-label-input ">
//                         <label>Instagram</label>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={instagram}
//                             onChange={changeInstagram}
//                         />
//                     </div>

//                     {(addressData == undefined) ?
//                         <div className="d-flex justify-content-center">
//                             <button className="next-back-btn" style={{ width: "250px", border: "1px solid white", fontSize: "18px" }} onClick={() => setShowAddress(true)}>Add address</button>
//                         </div>
//                         :
//                         <div className="address-detail-shopinfo">
//                             <span>{addressData.country} - {addressData.city}</span>
//                             <span>{addressData.line1 || addressData.addressLine1}</span>
//                             <span>{addressData.Zip || addressData.zip}</span>
//                             <div className="m-2 d-flex justify-content-between">
//                                 <button className="edit-address-detail" onClick={() => { setShowAddress(true) }}>Edit</button>
//                                 <button className="edit-address-detail" style={{ color: "red" }} onClick={() => { setAddressdata(undefined) }}>Delete</button></div>
//                         </div>
//                     }

//                     <div className="d-flex justify-content-end w-100">
//                         <button className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`}
//                             onClick={submitForm}
//                         >Next</button>
//                     </div>
//                 </>
//                 }
//                 {showAddress && <ShopInfoAddress close={closeAddres} addAddressF={addAddressF} addressData={addressData} />}

//             </div>
//         </>
//         // </RegisterStructure>
//     )
// }