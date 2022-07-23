
import BasketModal from "../basket modal/basket-modal-component"
import WalletButton from "../wallet button/wallet-button-component"
import defaultProfile from "../../../../assest/profile/defaultProfile.png"
import ProfileDropdown from "../profile-dropdown/ProfileDropdown"
import NotificationDropdown from "../notification-dropdown/Notification-dropdown"

import { ReactComponent as Cart } from "../../../../assest/icon/shopCart.svg"
import { IoMdNotificationsOutline } from "react-icons/io";
import { useProfile } from "../../../../context/profile/ProfileContext"
import { useState } from "react"
import { useCart } from "../../../../context/cart/CartContext"
import { useNotifications } from "../../../../context/notifications/NotificationsContext"

export default function UserHeader() {

    const [toggleHeader, setToggleHeader] = useState(false)
    const [toggleBasket, setToggleBasket] = useState(false)
    const [toggleNot, setToggleNot] = useState(false)

    const { profile } = useProfile()
    const { cart } = useCart();
    const { notifications } = useNotifications()



    let Profileimage = profile.avatar


    const openProfileModal = () => {
        setToggleHeader(p => !p)
        setToggleBasket(false)
        setToggleNot(false)
    }
    const openBasketModal = () => {
        setToggleBasket(p => !p)
        setToggleHeader(false)
        setToggleNot(false)
    }

    const openNotification = () => {
        setToggleNot(p => !p)
        setToggleBasket(false)
        setToggleHeader(false)
    }

    const closeBasket = () => {
        setToggleBasket(false)
    }

    const closeNotifications = () => {
        setToggleNot(false)
    }

    return (<>

        <WalletButton />

        <div className="login-wrapper">

            {/* cart icon */}
            <div className="item-cart-wraper">
                <Cart className="item-cart" onClick={openBasketModal} />
                {(cart != null) && (cart.items.length > 0) &&
                    <div className="item-cart-number">{cart.items.length}</div>}
            </div>

            {/* notification icon */}
            <div className="notification-icon" onClick={openNotification}>
                <IoMdNotificationsOutline />
                {(notifications.length > 0) && <div className="new-notification">{notifications.length}</div>}
            </div>

            {/* profile icon */}
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

            {toggleHeader && <ProfileDropdown headerToggle={setToggleHeader} />}
            {toggleBasket && <BasketModal close={closeBasket} />}
            {toggleNot && <NotificationDropdown close={closeNotifications} />}

        </div>
    </>)
}