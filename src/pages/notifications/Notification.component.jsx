import { Flex, Text, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";

import { useNotifications } from "../../context/notifications/NotificationsContext"
import { convetToCustomFormat } from "../../utils/date.utils/convertDate"
import { NOTIFICATION_TYPE } from "../../constant/notification.type"

const NotificationComponent = ({ notification }) => {

    const { seenNotif } = useNotifications()
    let navigate = useNavigate();
    console.log(notification.type)

    const clickNotification = () => {
        switch (notification.type) {
            case NOTIFICATION_TYPE.PRODUCER_ORDER_NEW:
                navigate("/producer/orders")
                seenNotif(notification._id)
            case NOTIFICATION_TYPE.PRODUCER_SKU_QUANTITY:
                navigate("/producer/ims")
                seenNotif(notification._id)
            case NOTIFICATION_TYPE.CUSTOMER_ORDER_STATUS:
                navigate("/purchseHistory")
                seenNotif(notification._id)
            default:
        }
    }


    return (
        <Flex
            w='100%'
            py='10px'
            px='10px'
            maxW='700px'
            border='2px'
            borderColor={(notification.seen)?"#666":'#8053ff'}
            borderRadius='10px'
            justifyContent='space-between'
            alignItems='center'
            cursor='pointer'
            _hover={{
                borderColor:'#ccc'
            }}
            onClick={clickNotification}
            mb='20px'
        >
            <Flex m="auto 0px"  alignItems='center'>
                <Box
                    w={{ base: '20px', md: '30px' }}
                    h={{ base: '20px', md: '30px' }}
                    mr='10px'>
                    <MdOutlineMessage style={{ width: "100%", height: "100%", fill: "white" }} />
                </Box>
                <Text
                    fontSize={{ base: '10px', md: '16px' }}
                    fontWeight='600'
                    color='white'
                >
                    {notification.text}
                </Text>
            </Flex>
            <Text
                fontSize={{ base: '8px', md: '12px' }}
                ml='10px'
                color='#666'>
                {convetToCustomFormat(notification.createdAt)}
            </Text>
        </Flex>
    )
}

export default NotificationComponent