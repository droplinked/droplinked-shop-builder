
import BasketModal from "../basket modal/basket-modal-component"
import WalletButton from "../wallet button/wallet-button-component"
import defaultProfile from "../../../../assest/profile/defaultProfile.png"
import ProfileDropdown from "../profile-dropdown/ProfileDropdown"

import { ReactComponent as Cart } from "../../../../assest/icon/shopCart.svg"
import { IoMdNotificationsOutline } from "react-icons/io";
import { useProfile } from "../../../../context/profile/ProfileContext"
import { useState } from "react"
import { useCart } from "../../../../context/cart/CartContext"

export default function UserHeader() {

    const [toggleHeader, setToggleHeader] = useState(false)
    const [toggleBasket, setToggleBasket] = useState(false)

    const { profile } = useProfile()
    const { cart } = useCart();


    let Profileimage = profile.avatar


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
                <Cart className="item-cart" onClick={openBasketModal} />
                {(cart != null) &&
                    <>
                        {(cart.items.length > 0) &&
                            <div className="item-cart-number">{cart.items.length}</div>
                        }

                    </>
                }
            </div>

            <div className="notification-icon">
                <IoMdNotificationsOutline />
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
                    style={{
                        backgroundImage: `url(${defaultProfile})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                    className="header-profile rounded-circle"
                    onClick={openProfileModal}
                ></div>
            }

            {toggleHeader && <ProfileDropdown headerToggle={setToggleHeader}/>}
            {toggleBasket && <BasketModal close={closeBasket} />}

        </div>
    </>)
}