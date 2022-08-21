import WalletButton from "../components/wallet-button/wallet-button-component"
import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container"
import Notification from "../icons/notification/notification-icon-component"
import ProfileIcon from "../icons/profile/profile-icon-component"
import Cart from "../icons/cart/cart-icon-component"

import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type"
import { useState } from "react"
import { Flex } from "@chakra-ui/react"
import { useProfile } from "../../../../context/profile/ProfileContext"

export default function UserHeader() {

    // state for manage dropdowns
    const [dropdown, setDropdown] = useState(null)

    const {  isCustomer ,isRegisteredProducer } = useProfile()

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

        {/* {isCustomer() && <WalletButton />} */}


        <Flex alignItems='center' ml={{ base: "10px", md: '15px' }}>

            {/* cart icon (show if type == producer) */}
            {isCustomer() && <Cart clickBasket={openBasket} />}

            {/* notification icon (show if type == producer)*/}
             <Notification click={openNotification} />

            {/* profile icon */}
            <ProfileIcon click={openProfileDropdown} />

            {/* get dropdown state and show dropdown match with state value */}
            {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
        </Flex>
    </>)
}