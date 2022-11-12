import { Flex, keyframes, Box , Image} from "@chakra-ui/react"
//import { IoMdNotificationsOutline } from "react-icons/io";
import { useNotifications } from "../../../../../context/notifications/NotificationsContext"
import { CartIconWrapper ,IconImage } from "../cart/cart-icon-style"
import { useState } from "react"
import DropdownContainer from "../../dropdowns/dropdown-container/DropDown-container";
import { DROPDOWN_TYPE } from "../../dropdowns/dropdown.type";
import notificationIcon from  "../../../../../assest/icon/notification-icon.svg"

const animationKeyframes = keyframes`
0% { opacity:0.2; }
50% { opacity:1; }
100% { opacity:0.2; }
`;

const animation = `${animationKeyframes} 1s linear infinite`;


export default function Notification() {

    const [dropdown, setDropdown] = useState(null);

    const { unseenNofitCount } = useNotifications()

    const openNotification = () => setDropdown(DROPDOWN_TYPE.NOTIFICATION);
    const close = () => setDropdown(null);

    console.log(unseenNofitCount())

    return (
        <CartIconWrapper pt='5px'>
                <IconImage  src={notificationIcon}/>
            {(unseenNofitCount() > 0) &&
                <Flex
                    pos='absolute'
                    w='100%'
                    h='100%'
                    justifyContent='center'
                    alignItems='center'
                    onClick={openNotification}
                >
                    <Box
                        bgColor='primary'
                        borderRadius='50%'
                        w='8px'
                        h='8px'
                        animation={animation}
                    >

                    </Box>
                </Flex>
            }
             {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
        </CartIconWrapper >
    )
}