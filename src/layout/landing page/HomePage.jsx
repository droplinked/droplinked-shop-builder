import "./HomePage.scss"

import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import { GetApi } from "../../sevices/functoinal-service/CallApiService"

import figmaImage1 from "../../assest/feature/home page images/figmaImage1.png"
import alertIcon from "../../assest/feature/home page images/alert.png"
import SignUpModal from "../../components/Modal/authen/register/SignUpModal"
import LoginModal from "../../components/Modal/authen/login/LoginModal"
import ResetPassModal from "../../components/Modal/authen/reset pass/ResetPassModal-component"
import axios from "axios"



export default function HomePage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let x = searchParams.get("modal")

    const [showSignup, setShowSignup] = useState(false);

    const [showLogin, setLogin] = useState(() => {
        return (x == "login") ? true : false
    });

    const [showResetPass, setResetPass] = useState(false);
    const [userName, setUsername] = useState("");
    const [former, setForError] = useState(false)
    const [userNameValidation, setUserNameVaidation] = useState(false)
    const [checkshopname, setCheckshopname] = useState(false);
    const [shopnameError, setShopnameError] = useState(undefined)


    const toggleSignUp = () => {
        setShowSignup(p => !p)
    }

    const toggleLogin = () => {
        setLogin(p => !p)
    }

    const toggleReset = () => {
        setResetPass(p => !p)
    }

    const switchModal = () => {
        toggleSignUp();
        toggleLogin();
    }

    const switchResetAndLogin = () => {
        console.log("x");
        toggleReset();
        toggleLogin();
    }

    const changeInputValue = e => {
        setUsername(e.target.value)
        setShopnameError(undefined)
        setForError(false)
        setUserNameVaidation(false)
    }


    const landingSignin = () => {
        if (!(/^[A-Za-z0-9_]*$/.test(userName))) {
            setUserNameVaidation(true);
            return;
        }
        setCheckshopname(true);
        GetApi(`/producer/shop-name/${userName}`, responseHandler, ErrorHandler)
    }

    const responseHandler = () => {
        setCheckshopname(false);
        toggleSignUp();
    }

    const ErrorHandler = (value) => {
        setCheckshopname(false);
        setShopnameError(value.reason)
    }

    return (<>
        <div className="bod">
            {/* inputs */}
            <div className="child d-flex rg">
                <div className="input-form w-100">
                    <div className="discove">Community <br />driven commerce</div>
                    <div className="earn">Earn cash or crypto for sharing collections.</div>
                    <div className="signup-wrapper d-flex justify-content-between">
                        <div className="d-flex justify-content-start" style={{ width: "75%", maxWidth: "75%" }}>
                            <span className="item-span">droplinked.com/</span>
                            <input type="text" placeholder="username" className="item-input"
                                onChange={changeInputValue}
                                value={userName}
                            />
                        </div>
                        <div className="d-flex" style={{ width: "25%" }}>
                            <button className="item-button"
                                onClick={() => {
                                    if (userName.trim() == "") {
                                        setForError(true)
                                    } else {
                                        landingSignin()
                                    }
                                }}>
                                {(checkshopname)
                                    ?
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                    :
                                    <>Sign up</>
                                }
                            </button>
                        </div>
                    </div>
                    {former &&
                        <div className="alert-wrap">
                            <img className="ratio ratio-1x1" src={alertIcon} alt="" />
                            {/* <span>URL already in use. Please try another. If you are the owner login heresdf</span> */}
                            <span>Please enter a valid username.</span>
                        </div>
                    }
                    {userNameValidation &&
                        <div className="alert-wrap">
                            <img className="ratio ratio-1x1" src={alertIcon} alt="" />
                            <span>Username can contain letters (a-z), numbers (0-9) and underscores.</span>
                        </div>
                    }
                    {(shopnameError) &&
                        <div className="alert-wrap">
                            <img className="ratio ratio-1x1" src={alertIcon} alt="" />
                            {/* <span>URL already in use. Please try another. If you are the owner login heresdf</span> */}
                            <span>{shopnameError}</span>
                        </div>
                    }

                </div>
            </div>
            {/* inputs */}

            {/* image */}
            <div className="child">
                <img className="ratio ratio-1x1 img-r" src={figmaImage1} alt="" />
            </div>
            {/* image */}
        </div>
        {showSignup && <SignUpModal close={toggleSignUp} shopname={userName} switchToggle={switchModal} />}
        {showLogin && <LoginModal close={toggleLogin} switchToggle={switchModal} switchReset={switchResetAndLogin} />}
        {showResetPass && <ResetPassModal backToLogin={switchResetAndLogin} close={() => { setResetPass(false) }} />}
    </>)
}