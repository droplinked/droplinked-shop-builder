
import WalletButton from "../wallet-button/wallet-button-component"
import defaultProfile from "../../../../assest/profile/defaultProfile.png"
import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container"

import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type"
import { ReactComponent as Cart } from "../../../../assest/icon/shopCart.svg"
import { IoMdNotificationsOutline } from "react-icons/io";
import { useProfile } from "../../../../context/profile/ProfileContext"
import { useState } from "react"
import { useCart } from "../../../../context/cart/CartContext"
import { useNotifications } from "../../../../context/notifications/NotificationsContext"


export default function UserHeader() {

    const [dropdown, setDropdown] = useState(null)

    const { profile } = useProfile()
    const { cart } = useCart();
    const { notifications } = useNotifications()

    let Profileimage = profile.avatar

  
    const openProfileDropdown= () => {
        setDropdown(DROPDOWN_TYPE.PROFILE)
    }
    const openBasket = () => {
        setDropdown(DROPDOWN_TYPE.BASKET)
    }

    const openNotification = () => {
        setDropdown(DROPDOWN_TYPE.NOTIFICATION)
    }

    const close = () => {
        setDropdown(null)
    }


    return (<>

        <WalletButton />

        <div className="login-wrapper">

            {/* cart icon */}
            <div className="item-cart-wraper">
                <Cart className="item-cart" onClick={openBasket} />
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
                    onClick={openProfileDropdown}
                />
                :
                <div
                    style={{
                        backgroundImage: `url(${defaultProfile})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                    className="header-profile rounded-circle"
                    onClick={openProfileDropdown}
                ></div>
            }
            {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
        </div>
    </>)
}