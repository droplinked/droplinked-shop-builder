
import BasketModal from "../basket modal/basket-modal-component"
import WalletButton from "../wallet button/wallet-button-component"

import { ReactComponent as Cart } from "../../../../assest/icon/shopCart.svg"
import { useProfile } from "../../../../sevices/hooks/useProfile"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../../sevices/hooks/useCart"




export default function UserHeader() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const [toggleBasket, setToggleBasket] = useState(false)
    const { profile, logout } = useProfile()
    const { itemCounter } = useCart();


    let url = window.location.pathname;
    let Profileimage = profile.avatar
    let navigate = useNavigate();

    let userStatus = profile.status;
    if (profile.user) {
        userStatus = profile.user.status
    } else {
        userStatus = profile.status
    }

    const clickProfile = () => {
        setToggleHeader(false)

        switch (userStatus) {
            case "VERIFIED":
                navigate("/register/personalInfo");
                return;
            case "PROFILE_COMPLETED":
                navigate("/register/shopInfo");
                return;
            case "SHOP_INFO_COMPLETED":
                navigate("/register/IMSSelect");
                return;
            case "IMS_TYPE_COMPLETED":
                navigate(`/shop/${profile.shopName}`);
                return;
            case "ACTIVE":
                navigate(`/shop/${profile.shopName}`);
                return;
        }
    }

    const clickIms = () => {
        navigate("/producer/ims");
    }

    const openProfileModal = () => {
        setToggleHeader(p => !p)
        setToggleBasket(false)
    }
    const openBasketModal = () => {
        setToggleBasket(p => !p)
        setToggleHeader(false)
    }

    const closeBasket = () => {
        setToggleBasket(false)
    }

    return (<>

        <WalletButton />

        <div className="login-wrapper">
            <div className="item-cart-wraper">
                <Cart className="item-cart"
                    onClick={openBasketModal}

                />
                {(itemCounter() > 0) &&
                    <div className="item-cart-number">{`${itemCounter()}`}</div>
                }

            </div>

            {(Profileimage)
                ?
                <img
                    src={Profileimage}
                    className="header-profile rounded-circle"
                    onClick={openProfileModal}
                />
                :
                <div
                    className="header-profile rounded-circle"
                    onClick={openProfileModal}
                ></div>
            }

            {toggleHeader &&
                <div className="header-nav">
                    <div className="header-nav-item" onClick={clickProfile}>Profile</div>
                    {(userStatus == "IMS_TYPE_COMPLETED") && <>
                        <Link to="/producer/ims">
                            <div className="header-nav-item" onClick={() => { setToggleHeader(false) }}>Inventory</div>
                        </Link>
                        <Link to="/producer/ruleset">
                            <div className="header-nav-item" onClick={() => { setToggleHeader(false) }}>Rulesets</div>
                        </Link>
                        <Link to="/producer/collection">
                            <div className="header-nav-item" onClick={() => { setToggleHeader(false) }}>Collection</div>
                        </Link>
                        <div className="header-nav-item">Settings</div>
                    </>
                    }
                    <div className="header-nav-item" onClick={logout}>Logout</div>
                </div>
            }
            {toggleBasket && <BasketModal close={closeBasket} />}
        </div>
    </>)
}