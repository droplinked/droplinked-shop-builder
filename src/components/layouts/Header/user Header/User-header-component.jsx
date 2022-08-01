import WalletButton from "../components/wallet-button/wallet-button-component"
import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container"
import Notification from "../icons/notification/notification-icon-component"
import ProfileIcon from "../icons/profile/profile-icon-component"
import Cart from "../icons/cart/cart-icon-component"

import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type"
import { useState } from "react"
import { Flex } from "@chakra-ui/react"


export default function UserHeader() {

    const [dropdown, setDropdown] = useState(null)


    const openProfileDropdown = () => {
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

        <Flex alignItems='center' ml={{ base: "10px", md: '15px' }}>

            {/* cart icon */}
            <Cart clickBasket={openBasket} />

            {/* notification icon */}
            <Notification click={openNotification} />

            {/* profile icon */}
            <ProfileIcon click={openProfileDropdown} />

            {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
        </Flex>
    </>)
}