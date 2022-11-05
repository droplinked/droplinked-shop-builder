import { Flex, keyframes, Box , Image} from "@chakra-ui/react"
//import { IoMdNotificationsOutline } from "react-icons/io";
import { useNotifications } from "../../../../../context/notifications/NotificationsContext"
import { CartIconWrapper ,IconImage } from "../cart/cart-icon-style"
import notificationIcon from  "../../../../../assest/icon/notification-icon.svg"

const animationKeyframes = keyframes`
0% { opacity:0.2; }
50% { opacity:1; }
100% { opacity:0.2; }
`;

const animation = `${animationKeyframes} 1s linear infinite`;


export default function Notification({ click }) {

    const { unseenNofitCount } = useNotifications()


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
        </CartIconWrapper >
    )
}